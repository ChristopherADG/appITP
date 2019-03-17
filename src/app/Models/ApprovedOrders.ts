export interface ApprovedOrders {
  date:String;
  time: String;
  user:Object;
  dinningRoom:Object;
  description: String;
  products:Array<Object>;
  status:String;
  original:String;
  approveObservations: String;
  approveUser:Object;
}
