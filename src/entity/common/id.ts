export abstract class Id {
	constructor(
		protected readonly _value: string | null
	){}
	nullValidate () {
		if (this._value === null) {
			throw new Error('値が null です')
		}
		return this._value
	}
}