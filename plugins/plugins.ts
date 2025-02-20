import mitt from "mitt";

type Events = {
  "project:delete-project": undefined | any;
  "project:delete-file": undefined | any;
  "project:delete-export": undefined | any;
};

export default defineNuxtPlugin(() => {
  const emitter = mitt<Events>();
  return {
    provide: {
      event: emitter.emit, // Will emit an event
      listen: emitter.on, // Will register a listener for an event
      off: emitter.off,
    },
  };
});
