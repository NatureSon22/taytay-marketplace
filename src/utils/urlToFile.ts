const urlToFile = async (url: string): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const name = url.split("/").pop() || "image.jpg";
  return new File([blob], name, { type: blob.type });
};

export default urlToFile;
