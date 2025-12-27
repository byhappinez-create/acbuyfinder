const data = {
    "Духи": {
        "Perfume": [
            { name: "reps 1:1 #1", url: "https://www.acbuy.com/product?id=7456662973&source=WD" },
            { name: "Магазин", url: "https://example.com/shop" }
        ]
    },
    "Одежда": {
        "Polar": [
            { name: "Jeans Reps 1:1", url: "https://www.acbuy.com/product?id=712403047789&source=TB" },
            { name: "Grailed", url: "https://grailed.com" }
        ],
        "Ami" : [
            { name: "Sweatshirt (VeryGoodQC)", url: "https://www.acbuy.com/product?id=7512955976&source=WD" }
],
        "Vlone" : [
            { name: "T-shirt (GoatQC)" , url: "https://www.acbuy.com/product?id=746290362970&source=TB" }
],
      
        "Stone Island": [
            { name: "Официальный сайт", url: "https://stoneisland.com" }
        ]
    },
    "Аксессуары": {
        "Vivienne Westwood": [
            { name: "Earrings (GoodQC)", url: "https://www.acbuy.com/product?id=782472299661&source=AL" },
            { name: "Box for Earrings (GoodQC)", url: "https://www.acbuy.com/product?id=833590374260&source=AL" },
            { name: "VW Necklace Bat (GoodQC)", url: "https://www.acbuy.com/product?id=18397861024&source=TB" },
            { name: "VW Classic Necklace (GoodQC)", url: "https://www.acbuy.com/product?id=20462743231&source=TB" }
        ]
    },
   "Шузы" : {
      "Nike" : [
            { name: "Nike Voodoo Jd1 low (VeryGoodQC)" , url: "https://www.acbuy.com/product?id=5897794277&source=WD" }
]
},
};

const content = document.getElementById("content");
const title = document.getElementById("title");
const backBtn = document.getElementById("backBtn");
const search = document.getElementById("search");

let historyStack = []; // <-- ВАЖНО: хранит шаги
let currentView = { type: "categories" };

function render(view) {
    content.innerHTML = "";
    search.value = "";

    backBtn.classList.toggle("hidden", historyStack.length === 0);

    if (view.type === "categories") {
        title.innerText = "Категории";
        Object.keys(data).forEach(category => {
            addButton(category, () => {
                historyStack.push(currentView);
                currentView = { type: "brands", category };
                render(currentView);
            });
        });
    }

    if (view.type === "brands") {
        title.innerText = view.category;
        const brands = Object.keys(data[view.category]);

        brands.forEach(brand => {
            addButton(brand, () => {
                historyStack.push(currentView);
                currentView = {
                    type: "links",
                    category: view.category,
                    brand
                };
                render(currentView);
            });
        });

        search.oninput = () => {
            content.innerHTML = "";
            brands
                .filter(b => b.toLowerCase().includes(search.value.toLowerCase()))
                .forEach(brand => {
                    addButton(brand, () => {
                        historyStack.push(currentView);
                        currentView = {
                            type: "links",
                            category: view.category,
                            brand
                        };
                        render(currentView);
                    });
                });
        };
    }

    if (view.type === "links") {
        title.innerText = view.brand;
        data[view.category][view.brand].forEach(link => {
            addButton(link.name, () => {
                window.open(link.url, "_blank");
            });
        });
    }
}

function addButton(text, action) {
    const div = document.createElement("div");
    div.className = "button";
    div.innerText = text;
    div.onclick = action;
    content.appendChild(div);
}

backBtn.onclick = () => {
    currentView = historyStack.pop();
    render(currentView);
};

render(currentView);
