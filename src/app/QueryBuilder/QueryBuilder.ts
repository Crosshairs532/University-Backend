/* eslint-disable no-undef */
import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  // modelQuery  =  all types of models;
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  search(searchFields: string[]) {
    console.log(searchFields);
    const searchTerm = this?.query?.searchTerm;
    if (this?.query?.searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }
  filter() {
    const queryObj = { ...this.query };
    //filtering
    const excluding = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excluding.forEach((val) => delete queryObj[val]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }
  sort() {
    const sort =
      this?.query?.sort ||
      '-createdAt' ||
      (this?.query?.sort as string).split(',').join(' ');
    this.modelQuery = this?.modelQuery?.sort(sort as string);
    return this;
  }
  paginate() {
    const limit = Number(this?.query?.limit) || 1;
    const page = Number(this?.query?.page) || 1;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields =
      this.query && this.query.fields && typeof this.query.fields === 'string'
        ? this.query.fields.split(',').join(' ')
        : '-__v' || null;

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
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
