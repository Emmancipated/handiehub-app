export const formattedDropdown = (array: string[]) =>
  array.map((entry) => ({
    label: entry,
    // value: entry.toLowerCase().replace(/ /g, "_"),
    value: entry.toLowerCase(),
  }));

const me = {
  to: "LIEZsmEFncFkBZDDxKc9Ul",
  sound: "default",
  title: "New Notification with Image",
  body: "Here is a notification with an image!",
  data: { additionalData: "some data" },
  channelId: "default",
  attachments: [
    {
      url: "https://unsplash.com/photos/coffee-machine-in-a-cafe-CSFcFNkce_s",
      mimeType: "image/jpeg",
    },
  ],
};
