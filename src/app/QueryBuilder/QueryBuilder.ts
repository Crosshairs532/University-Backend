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
}

export default QueryBuilder;
