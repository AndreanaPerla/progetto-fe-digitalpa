/* photo model */
export class Photo {
  constructor({ id, url, fileName, fileSize, exifData = {} }) {
    this.id = id;
    this.url = url;
    this.fileName = fileName;
    this.fileSize = fileSize;
    this.exifData = this.createExifData(exifData);
  }

  /* create exifData with default values merged with customData */
  createExifData(customData = {}) {
    const defaultExifData = {
      Make: "",
      Model: "",
      DateTimeOriginal: "",
      Orientation: "1",
      Software: "",
      exposureData: {
        exposureTime: "",
        fNumber: "",
        iso: "",
        focalLength: "",
        exposureMode: "",
        whiteBalance: "",
        flash: "",
      },
      gpsCoordinates: {
        latitude: null,
        longitude: null,
        altitude: "",
        location: "",
      },
    };

    return {
      ...defaultExifData,
      ...customData,
      exposureData: {
        ...defaultExifData.exposureData,
        ...(customData.exposureData || {}),
      },
      gpsCoordinates: {
        ...defaultExifData.gpsCoordinates,
        ...(customData.gpsCoordinates || {}),
      },
    };
  }

  /* create a Photo object from an uploaded file */
  static createFromUpload(imageData, id) {
    return new Photo({
      id: String(id).padStart(3, "0"),
      url: imageData.url,
      fileName: imageData.name,
      fileSize: `${(imageData.size / (1024 * 1024)).toFixed(1)} MB`,
      exifData: {
        Make: "User Upload",
        Software: "Photo Gallery Upload",
      },
    });
  }

  /* create a Photo object from JSON data */
  static createFromJSON(jsonData) {
    return new Photo(jsonData);
  }

  /* convert the Photo object to a plain object for serialization */
  toJSON() {
    return {
      id: this.id,
      url: this.url,
      fileName: this.fileName,
      fileSize: this.fileSize,
      exifData: this.exifData,
    };
  }
}

export default Photo;
