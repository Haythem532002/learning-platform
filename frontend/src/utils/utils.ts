export const extractExtension = (file: string) => {
  let extension = "";
  for (let k = file.length - 1; k > -1; k--) {
    if (file[k] == ".") break;
    extension += file[k];
  }
  console.log(typeof extension);
  extension = extension.split("").reverse().join("");
  console.log(extension);
  return extension.toUpperCase();
};

// export const convertToBase64 = (file: File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });
// };

export function formateDateToLocal(date: Date, minute: number, hour: number) {
  // 2024-01-01T14:30:30
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();
  const monthadder = month < 10 ? "0" : "";
  const dayadder = day < 10 ? "0" : "";
  const minuteadder = minute < 10 ? "0" : "";
  const houradder = hour < 10 ? "0" : "";
  return (
    date.getFullYear() +
    "-" +
    monthadder +
    month +
    "-" +
    dayadder +
    day +
    "T" +
    houradder +
    hour +
    ":" +
    minuteadder +
    minute +
    ":00"
  );

  //011-3T0:0:00
}
