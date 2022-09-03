import formatDate from "./formatDate";

export default function generateAnnouncement(title, description, price, contact, photo ) {
    return JSON.stringify({
        title,
        description,
        price,
        contact,
        photo,
        added: formatDate(new Date())
    });
}
