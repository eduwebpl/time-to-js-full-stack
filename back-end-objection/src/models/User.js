import { Model } from 'objection'

export class User extends Model {
	 static tableName = 'users'

	$formatJson(json) {
		const computed = super.$formatJson(json);
		delete computed.password;
		return computed;
	}
}
