import { Model } from 'objection'
import { User } from './User.js';

export class Order extends Model {
	 static tableName = 'orders'

	static relationMappings = {
		 user: {
			 relation: Model.BelongsToOneRelation,
			 modelClass: User,
			 join: {
				 from: 'orders.userId',
				 to: 'users.id'
			 }
		 }
	}
}
