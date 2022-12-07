https://www.planetware.com/tourist-attractions-/helsinki-helsingfors-sf-udn-hels.htm


class FirebaseTimestamp {
    constructor(seconds, nanoseconds){
      this.seconds = Number(seconds);
      this.nanoseconds = Number(nanoseconds);
    }
  }
  
### Convert from calendar dateString to Unix Epoch Time in ms:
  const unixTime = (dateString)=>Date.parse(dateString);

### Convert from Unix Epoch Time in ms to calendar string:
 const calendarDate=(date) => new Date(date).toDateString();

   var dt = new Date(1670228039000);
    //eg 1485789600 * 1000
    console.log(dt.toDateString());

### Convert from Firebase timeStamp to Unix Epoch Time in milliseconds:
trip.tripdate?.seconds * 1000 + trip.tripdate?.nanoseconds/1000000

### Convert from Firebase Timestamp to calendar string:
new Date(trip.tripdate?.seconds * 1000 + trip.tripdate?.nanoseconds/1000000)


https://maps.googleapis.com/maps/api/js?key=AIzaSyDCqk89zEBVq3EHVK1ucjCf6trAfXDjH8U&callback=myMap



