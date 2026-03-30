export interface GameObject {
  id: string;
  name: string;
  isDemo: boolean;
  clue: string;
  x: number;
  y: number;
  modulePath?: string;
}

export const gameObjects: GameObject[] = [
  {
    id: "alchemy",
    name: "Taylor Swift",
    isDemo: true,
    clue: `Swift by name and swift in fame,
She turns life's pages into song and name,
From moments lived, she weaves her art,
Echoes of life in every part.`,
    x: 12,
    y: 35,
    modulePath:
      "https://www.youtube.com/embed/iMMUAd66vxo?si=HaEY7WYefJCMdnXT&autoplay=1",
  },
  {
    id: "automobile",
    name: "Automobile",
    isDemo: true,
    clue: `Before my time, the horse was king,
But iron and steel changed everything.
Four wheels roll where hooves once tread,
A horseless carriage forging ahead.`,
    x: 58,
    y: 52,
    modulePath: "/objects/dummy-find.html",
  },
  {
    id: "globe",
    name: "Globe",
    isDemo: true,
    clue: `A silver wanderer maps the Earth,
Showing lands of every birth.
Spin me round to see it all,
A world entire within a ball.`,
    x: 92,
    y: 39,
    modulePath: "/objects/dummy-find.html",
  },
  {
    id: "lightbulb",
    name: "Light Bulb",
    isDemo: true,
    clue: `When darkness ruled the evening hour,
I brought the gift of glowing power.
A filament aglow with might,
I turned the night into the light.`,
    x: 47,
    y: 20,
    modulePath: "/objects/dummy-find.html",
  },
  {
    id: "compass",
    name: "Magnetic Compass",
    isDemo: false,
    clue: `When seas were vast and maps were few,
A silent guide would point what's true.
No voice it speaks, yet shows the way,
Find the needle that will never stray.`,
    x: 32,
    y: 58,
    modulePath: "/objects/module1.html",
  },
  {
    id: "bluetooth",
    name: "Bluetooth",
    isDemo: false,
    clue: `A Viking King's mark in a world without thread,
Binds the silent air where invisible signals are spread.
No silver wire nor iron chain, yet it links to the brain,
Seek the azure rune where the ghost-signals remain.`,
    x: 10,
    y: 54,
    modulePath: "/objects/module2.html",
  },
  {
    id: "internet",
    name: "Internet (Router)",
    isDemo: false,
    clue: `A web is spun, yet no spider is near,
Messages travel both far and near.
Born in sixty-nine across the sea,
Find the network connecting you and me.`,
    x: 72,
    y: 12,
    modulePath: "/objects/module3 copy.html",
  },
  {
    id: "zero",
    name: "Zero",
    isDemo: false,
    clue: `Born from nothing, yet shaping it all,
A silent symbol that answers the call.
In circles I live, both empty and whole,
Find me where numbers begin their role.`,
    x: 20,
    y: 84,
    modulePath: "/objects/module4_gazette.html",
  },
  {
    id: "penicillin",
    name: "Penicillium",
    isDemo: false,
    clue: `From humble mold, a quiet fight grew,
An unseen hero the world never knew.
It wages war where sickness may dwell,
A tiny savior with stories to tell.`,
    x: 76,
    y: 86,
    modulePath: "/objects/penicilin_.html",
  },
];
