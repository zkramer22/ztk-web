const animatedAds = [
    'animated-ads/ad_r-squared_rect.mov',
    'animated-ads/ad_r-squared_square.mov',
    'animated-ads/aml-ad-square.mov',
    'animated-ads/aml-rect.mov',
]
const brandedSites = [
    'branded-sites/dupont_list-filtered-1.png',
    'branded-sites/dupont_list-filtered-2.png',
    'branded-sites/dupont_search-bar.png',
    'branded-sites/dupont_search-guide.png',
    'branded-sites/dupont_search-hazard.png',
    'branded-sites/ford-1.png',
    'branded-sites/ford-ffn-2-modal.mov',
    'branded-sites/ford-ffn-4.png',
    'branded-sites/ford-ffn-5.png',
    'branded-sites/ford-ffn-6.png',
    'branded-sites/ford-search-1.mov',
    'branded-sites/ford-search-2.mov',
    'branded-sites/ford-search-3.mov',
    'branded-sites/ford-upfit-1.mov',
    'branded-sites/ford-upfit-2.png',
    'branded-sites/ford-vehicle-1.mov',
    'branded-sites/ford-vehicle-2.mov',
    'branded-sites/kitchenaid-hero.gif',
    'branded-sites/kitchenaid-hero.mov',
    'branded-sites/kitchenaid-mixers.gif',
    'branded-sites/kitchenaid-mixers.mov',
    'branded-sites/whirlpool-home.gif',
    'branded-sites/whirlpool-home.mov',
    'branded-sites/whirlpool-washers.mov',
]
const healthSites = [
    // 'health-sites/aml-site-1.png',
    'health-sites/aml-site-1.mov',
    // 'health-sites/aml-site-2.png',
    'health-sites/aml-site-audio.png',
    'health-sites/legend-home.png',
    'health-sites/legend-diagram.png',
    'health-sites/legend-3.png',
    'health-sites/loxo-site-1.png',
    'health-sites/loxo-site-2.png',
    'health-sites/loxo-site-3.png',
    'health-sites/unithroid-1.png',
    'health-sites/unithroid-2.png',
    'health-sites/unithroid-3.png',
    'health-sites/unithroid-5.png',
    'health-sites/unithroid-load.mov',
    'health-sites/xiaflex-1.png',
    'health-sites/xiaflex-2.png',
    'health-sites/xiaflex-3.png',
]
const healthPanels = [
    'health-panels/panel01.jpg',
    'health-panels/panel02.jpg',
    'health-panels/panel05.jpg',
    'health-panels/panel08.jpg',
    'health-panels/panel09.jpg',
]
const dataViz = [
    'data-viz/stream-data-demo.png',
    'branded-sites/ford-ffn-1.png',
    'branded-sites/ford-ffn-2.png',
    'branded-sites/ford-ffn-3.png',
]
const design = [
    'figma-design/app-design-1.png',
    'figma-design/app-design-2.png',
    'figma-design/app-design-3.png',
    'figma-design/app-design-4.png',
    'figma-design/tattoo-1.png',
]
const app = [
    '',
]
const personal = [
    '',
]

export const chips = [
    'JavaScript',
    'HTML', 
    'CSS', 
    'Sass',
    'Vue',
    'React',
    'Svelte',
    'Python',
    'Node',
    'Ruby',
    'AWS',
    'GSAP',
    'ScrollMagic',
    'Gatsby',
    'Electron',
    'WordPress',
    'ToneJS',
    'Wavesurfer',
    // 'Max',
]

export const workItems = [
    {
        title: "healthcare marketing",
        body: "Over the years, I’ve built all kinds of things for the healthcare industry. Projects ranged from custom company websites, to animated advertisements, to interactive info panels on display at national conferences. While I had to work within strict stylistic constraints during design and development phases, I was able to expand my toolset and deepen my understanding along the way.",
        short: "custom company websites, animated advertisements, interactive info panels",
        media: [
            ...healthSites, ...animatedAds, ...healthPanels
        ],
        chips: [
            'JavaScript',
            'HTML', 
            'CSS', 
            'Vue',
            'GSAP',
            'Sass',
            'Electron',
            'ScrollMagic',
            'WordPress',
            'Gatsby',
        ],
    },
    {
        title: "enterprise-level brand development",
        body: "OneMagnify completed a series of branding jobs for Whirlpool, KitchenAid, Maytag, and other household names. My roles here ranged from creating email marketing content to developing features for the e-commerce experience across all the sites. Advanced filtering system, responsive design, and fast load times were imperative here.",
        short: "landing pages, e-commerce UI, advanced search & filtering, Google Maps API integration, remote database connection",
        media: [
            ...brandedSites,
        ],
        chips: [
            'JavaScript',
            'HTML', 
            'CSS',
            'React',
        ],
    },
    {
        title: "design",
        body: "",
        short: "UI design for web apps, components, SVG icons & drawings",
        media: [
            ...design,
        ],
        chips: [
            "Figma",
        ],
    },
    {
        title: "personal projects",
        body: "",
        short: "interactive web pages, apps, games",
        media: [

        ],
        chips: [
            "JavaScript",
            "HTML",
            "CSS",
            "Sass",
            "Vue",
            "ToneJS",
            "React",
            "Redux",
            "Ruby",
            "Svelte"
        ],
    },
]