

export const defaults={
    name:'', capacity:0, description:'',
    picture: 'https://th.bing.com/th/id/OIP.K15zdMQUpDP92j5PUnm2NAHaEK?cb=iwp1&rs=1&pid=ImgDetMain'
};

export const Templates=[
    {
        title: '🔁 (clear)',
    },
    {
        name: 'Prispax 2.0',
        capacity: 20000,
        picture: 'https://thumbs.dreamstime.com/z/view-futuristic-spaceship-advanced-technology-sleek-design-floating-depths-space-view-futuristic-272647302.jpg',
        description: `Presenting the Astrolux Odyssey: a revolutionary spacecraft merging cutting-edge technology with lavish luxury, designed to usher 10,000 passengers into the solar system's embrace. A marvel of engineering, its sleek exterior is adorned with solar panels, fueling advanced propulsion while minimizing environmental impact.Within, the vessel transforms into a haven of opulence. Lavish suites offer cosmic panoramas, celestial artwork bedecks lounges, and sprawling gardens thrive in zero-gravity. Culinary excellence reigns in gourmet restaurants, while immersive theaters and VR chambers offer stellar entertainment.Safety remains paramount with cosmic radiation shielding and top-tier medical facilities. The Astrolux Odyssey not only advances space exploration but redefines elegance, uniting humanity's thirst for knowledge with a taste of the sublime.`
    },
    {
        name: 'Curiosity',
        capacity: 1,
        picture: 'https://mars.nasa.gov/system/feature_items/images/6037_msl_banner.jpg',
        description: `Send me to mars!`
    },
    {
        name: 'Milenium Falcon',
        capacity: 5000,
        picture: 'https://th.bing.com/th/id/R.213b49e09a2ce7784ecbac442d5d9919?rik=y5beAcUaStZHYA&pid=ImgRaw&r=0',
        description: `I am your father!`
    }
];

export const BuildForum={
    setters:{}, defaults:{},
    set(id, val){
        this[id] = val;
        this.setters[id]?.(val);
        this.changedId(id);
    },
    reset(id){
        this.set(id, this.defaults[id]);
    },
    events:{},
    changedId(id){
        if(this.events[id]){
            this.events[id].forEach(func=>func(this[id]));
        }
    },
    changed(id, listener){
        (this.events[id]??=new Set()).add(listener);
        listener(this[id]);
    },
    unchanged(id, listener){
        (this.events[id]??=new Set()).delete(listener);
    },
};
