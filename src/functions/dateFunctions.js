import Moment from "moment";

export function formatDate(date) {
    return Moment(date).format("DD MMM YYYY");
  }

  export function formatDateTime(date) {
    return Moment(date).format("DD MMM YYYY HH:MM");
  }