import { EventInput } from "@fullcalendar/angular";

const d = new Date();
const day = d.getDate();
const month = d.getMonth();
const year = d.getFullYear();

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: "event1",
    title: "Rassemblement du personnel pour la réunion",
    start: new Date(year, month, 1, 0, 0),
    end: new Date(year, month, 1, 23, 59),
    className: "fc-event-success",
    groupId: "Yaba-In",
    details:
      "Contenu du message envoyé à cette date.",
  },
  {
    id: "event2",
    title: "Rappel Accueil du personel de l'AUF",
    start: new Date(year, month, day + 28, 16, 0),
    end: new Date(year, month, day + 29, 20, 0),
    allDay: false,
    className: "fc-event-primary",
    groupId: "UdM",
    details:
      "Contenu du message envoyé à cette date.",
  },
  {
    id: "event3",
    title: "Rappel au personnel",
    start: new Date(year, month, day + 4, 12, 0),
    end: new Date(year, month, day + 4, 20, 0),
    allDay: false,
    className: "fc-event-warning",
    groupId: "DigiKuntz",
    details:
      "Contenu du message envoyé à cette date.",
  },
  {
    id: "event4",
    title: "Meetin de cloture de projet",
    start: new Date(year, month, day + 14, 10, 30),
    end: new Date(year, month, day + 16, 20, 0),
    allDay: false,
    className: "fc-event-success",
    groupId: "Yaba-In",
    details:
      "Contenu du message envoyé à cette date.",
  },
  {
    id: "event5",
    title: "Lunch",
    start: new Date(year, month, day, 11, 0),
    end: new Date(year, month, day, 14, 0),
    allDay: false,
    className: "fc-event-primary",
    groupId: "UdM",
    details:
      "Contenu du message envoyé à cette date.",
  },
  {
    id: "event6",
    title: "Meeting",
    start: new Date(year, month, day + 2, 12, 30),
    end: new Date(year, month, day + 2, 14, 30),
    allDay: false,
    className: "fc-event-success",
    groupId: "Yaba-In",
    details:
      "Contenu du message envoyé à cette date.",
  },
  {
    id: "event7",
    title: "Birthday Party",
    start: new Date(year, month, day + 17, 19, 0),
    end: new Date(year, month, day + 17, 19, 30),
    allDay: false,
    className: "fc-event-warning",
    groupId: "Groupe SIA",
    details:
      "Contenu du message envoyé à cette date.",
  },
  {
    id: "event8",
    title: "Relance client",
    start: new Date(year, month, day + -5, 10, 0),
    end: new Date(year, month, day + -4, 10, 30),
    allDay: false,
    className: "fc-event-danger",
    groupId: "digiKuntz",
    details:
      "Contenu du message envoyé à cette date.",
  },
  {
    id: "event9",
    title: "Annonce Compo permi",
    start: new Date(year, month, day + 6, 10, 0),
    end: new Date(year, month, day + 7, 10, 30),
    allDay: false,
    className: "fc-event-info",
    groupId: "Auto-école",
    details:
      "Contenu du message envoyé à cette date.",
  },
  {
    id: "event10",
    title: "Collage Party",
    start: new Date(year, month, day + 20, 10, 0),
    end: new Date(year, month, day + 20, 10, 30),
    allDay: false,
    className: "fc-event-info",
    groupId: "Auto-école",
    details:
      "Contenu du message envoyé à cette date.",
  },
];
