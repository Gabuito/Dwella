import type { TContract, TInterval, TStatus } from "../interfaces/types.ts";

export default class Contract {

  private _id: number;
  private _uuid: string;
  private _tenant: string;
  private _owner: string;
  private _property: string;
  private _startDate: Date;
  private _endDate: Date;
  private _value: number;
  private _status: TStatus;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _interval: TInterval;

  constructor(data : TContract) {
    this._id = data.id;
    this._uuid = data.uuid
    this._tenant = data.tenant;
    this._owner = data.owner;
    this._property = data.property;
    this._startDate = data.startDate || new Date();
    this._endDate = data.endDate;
    this._value = data.value;
    this._status = data.status || 'active';
    this._createdAt = new Date();
    this._updatedAt = new Date();
    this._interval = data.interval || 'monthly';
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get uuid(): string {
    return this._uuid;
  }

  get tenant(): string {
    return this._tenant;
  }

  get owner(): string {
    return this._owner;
  }

  get property(): string {
    return this._property;
  }

  get startDate(): Date {
    return this._startDate;
  }

  get endDate(): Date {
    return this._endDate;
  }

  get value(): number {
    return this._value;
  }

  get status(): TStatus {
    return this._status;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get interval(): TInterval {
    return this._interval;
  }

  // Setters
  set tenant(value: string) {
    this._tenant = value;
  }

  set owner(value: string) {
    this._owner = value;
  }

  set property(value: string) {
    this._property = value;
  }

  set startDate(value: Date) {
    this._startDate = value;
  }

  set endDate(value: Date) {
    this._endDate = value;
  }

  set value(amount: number) {
    this._value = amount;
  }

  set status(newStatus: TStatus) {
    this._status = newStatus;
  }

  set interval(newInterval: TInterval) {
    this._interval = newInterval;
  }

  // Useful methods
  protected activateContract(): void {
    this._status = 'active';
    this._updatedAt = new Date();
  }

  protected completeContract(): void {
    this._status = 'completed';
    this._updatedAt = new Date();
  }

  protected cancelContract(): void {
    this._status = 'cancelled';
    this._updatedAt = new Date();
  }

  protected extendContract(newEndDate: Date): void {
    if (newEndDate > this._endDate) {
      this._endDate = newEndDate;
      this._updatedAt = new Date();
    } else {
      throw new Error('New end date must be later than the current end date.');
    }
  }
  protected updateValue(newValue: number): void {
    this._value = newValue;
    this._updatedAt = new Date();
  }
  protected updateInterval(newInterval: TInterval): void {
    this._interval = newInterval;
    this._updatedAt = new Date();
  }
  protected updateTenant(newTenant: string): void {
    this._tenant = newTenant;
    this._updatedAt = new Date();
  }
 }
