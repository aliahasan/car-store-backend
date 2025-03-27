import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = queryModel;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    const searchValue = searchableFields.map(
      (value) =>
        ({
          [value]: { $regex: searchTerm, $options: 'i' },
        }) as FilterQuery<T>
    );
    if (searchTerm) {
      this.queryModel = this.queryModel.find({
        $or: searchValue,
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = [
      'searchTerm',
      'sortOrder',
      'sortBy',
      'limit',
      'page',
      'fields',
    ];
    excludeFields.forEach((el) => delete queryObj[el]);
    this.queryModel = this.queryModel.find(queryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    let sortStr;
    if (this?.query?.sortBy && this?.query?.sortOrder) {
      const sortBy = this?.query?.sortBy;
      const sortOrder = this?.query?.sortOrder;
      sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
    }
    this.queryModel = this.queryModel.sort(sortStr);
    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.queryModel = this.queryModel.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.queryModel = this.queryModel.select(fields);
    return this;
  }

  ratings() {
    const rating = Number(this.query?.averageRating);
    if (!isNaN(rating) && rating > 0) {
      this.queryModel = this.queryModel.find({
        averageRating: { $gte: rating },
      } as FilterQuery<T>);
    }
    return this;
  }
  year() {
    const year = Number(this.query?.year);
    if (!isNaN(year) && year > 0) {
      this.queryModel = this.queryModel.find({
        year: { $gte: year },
      } as FilterQuery<T>);
    }
    return this;
  }

  priceRange(minPrice?: number, maxPrice?: number) {
    const priceFilter: Record<string, unknown> = {};
    if (minPrice !== undefined) priceFilter.$gte = minPrice;
    if (maxPrice !== undefined) priceFilter.$lte = maxPrice;
    if (minPrice !== undefined || maxPrice !== undefined) {
      this.queryModel = this.queryModel.find({
        price: priceFilter,
      } as FilterQuery<T>);
    }

    return this;
  }

  async countTotal() {
    const totalQueries = this.queryModel.getFilter();
    const total = await this.queryModel.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);
    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
