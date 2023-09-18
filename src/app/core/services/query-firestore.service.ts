import { Injectable } from '@angular/core';
import { Filter } from '../models/query.model';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import {
  DocumentSnapshot,
  Query,
  collection,
  FieldPath,
  documentId,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class QueryFirestoreService {
  constructor(private afs: AngularFirestore) {}

  getByDocumentById(collection: string, id: string) {
    return this.afs.collection(collection).doc(id).get();
  }

  getByDocumentByIds(collection: string, ids: string[]) {
    return this.afs
      .collection(collection, (ref) => ref.where(documentId(), 'in', ids))
      .get();
  }

  search<T>(
    filters: Filter[],
    orderBy: string,
    limit: number,
    lastVisibleEl: DocumentSnapshot | null,
    collection: string
  ) {
    let query: any = this.afs.collection<T>(collection).ref;
    if (filters.length > 0) {
      filters.forEach((f) => {
        query = query.where(f.keyProp, f.type, f.keyword);
      });
    }
    if (!!orderBy) {
      query = query.orderBy(orderBy);
    }
    if (!!lastVisibleEl) {
      query = query.startAfter(lastVisibleEl);
    }
    if (!!limit) {
      query = query.limit(limit);
    }
    return query.get();
  }

  create<T>(object: any, collection: string) {
    return this.afs.collection<T>(collection).add(object);
  }
  update<T>(id: string, object: any, collection: string) {
    return this.afs.collection<T>(collection).doc(id).update(object);
  }
  delete<T>(id: string, collection: string) {
    return this.afs.collection<T>(collection).doc(id).delete();
  }
}
