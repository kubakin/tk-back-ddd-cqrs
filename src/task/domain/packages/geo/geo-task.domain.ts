import { TaskDomain } from '../../task.domain';
import { GeoTaskAnswer } from './geo-task.answer';

function getDistanceFromLatLonInMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const R = 6371e3; // Радиус Земли в метрах
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// // Координаты первой точки
// const lat1 = 55.7558; // широта
// const lon1 = 37.6176; // долгота

// // Координаты второй точки
// const lat2 = 55.7567; // широта
// const lon2 = 37.6176; // долгота

// // Радиус в метрах
// const radius = 1000;

// const distance = getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2);
const dotIsInclude = (
  radius: number,
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const distance = getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2);
  return distance <= radius;
};
// if (distance <= radius) {
//   console.log("Вторая точка входит в радиус от первой точки");
// } else {
// }
export class GeoTaskDomain extends TaskDomain {
  answer: GeoTaskAnswer & { radius: number };
  __validate(data: unknown) {
    const answer = GeoTaskAnswer.validate(data);
    const result = dotIsInclude(
      this.answer.radius,
      this.answer.latitude,
      this.answer.longitude,
      answer.latitude,
      answer.longitude,
    );
    if (!result) {
      throw new Error('Not correct answer');
    }
  }
}
