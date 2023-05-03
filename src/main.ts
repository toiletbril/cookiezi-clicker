//===========================================//
/*                                            *
*             Cookiezi Clicker :3             *
*                     by                      *
*              toiletbril@github              *
*                                            */
//===========================================//

/*
TODO:
 - Optimization of calc functions
 - Separate the files
 - Cascase style sheet
*/

//===========================================//

const AMOUNT_TEXT_ELEMENT
    = document.getElementById("amount") as HTMLElement;
const PPS_SHOP_ITEMS_LIST_ELEMENT
    = document.getElementById("pps_shop_items") as HTMLUListElement;
const GENERAL_SHOP_ITEMS_LIST_ELEMENT
    = document.getElementById("shop_items") as HTMLUListElement;
const TAP_POWER_TEXT_ELEMENT
    = document.getElementById("tap_power") as HTMLElement;
const PPS_TEXT_ELEMENT
    = document.getElementById("pps") as HTMLElement;
const UPGRADES_COUNT_TEXT_ELEMENT
    = document.getElementById("upgrades_count") as HTMLElement;
const CHANGE_KEYS_BUTTON_ELEMENT
    = document.getElementById("change_keys") as HTMLButtonElement;
const KEYS_TEXT_ELEMENT
    = document.getElementById("keys") as HTMLButtonElement;
const MAIN_DIV_ELEMENT
    = document.getElementById("main") as HTMLDivElement;
const BPM_TEXT_ELEMENT
    = document.getElementById("bpm") as HTMLHeadingElement;

assert("All elements are not null",
    !!AMOUNT_TEXT_ELEMENT &&
    !!PPS_SHOP_ITEMS_LIST_ELEMENT &&
    !!GENERAL_SHOP_ITEMS_LIST_ELEMENT &&
    !!TAP_POWER_TEXT_ELEMENT &&
    !!UPGRADES_COUNT_TEXT_ELEMENT &&
    !!CHANGE_KEYS_BUTTON_ELEMENT &&
    !!KEYS_TEXT_ELEMENT &&
    !!BPM_TEXT_ELEMENT &&
    !!MAIN_DIV_ELEMENT
);

const TPS = 40;

// This is here to account for setTimeout's delays ;(
const TPS_ADJ = Math.floor(TPS - TPS / 11);

const KEY_COUNT = 2;

const CHANGE_KEYS_TEXT
    = "Change keys..."
const CHANGING_KEYS_TEXT
    = "Press a new key..."
const CURRENCY_TEXT =
    "pp";
const TAP_POWER_TEXT =
    "pp/tap";
const FORMAT_CHAR =
    ",";

const PPS_COST_MULTIPLIER = 1.15;

//===========================================//

function assert(desc: string, cond: boolean): void {
    if (!cond) throw new Error("Assertion failed: " + desc);
}

function make_current_keys_text(k1: string, k2: string, n: number): string {
    return `Tap ${n <= 0 ? "?" : k1.toUpperCase()}/${n <= 1 ? "?" : k2.toUpperCase()} to gain pp.`;
}

// 1000000 -> 1,000,000
function format_number(n: number, fixed: number): string {
    // Regex version is better :3
    return n.toFixed(fixed).replace(/\B(?=(\d{3})+(?!\d))/g, FORMAT_CHAR);
}

function make_shop_item(item: PpsUpgrade | GeneralUpgrade, stat_text: string,
    item_type: "pps_item" | "item", click_action: () => void): HTMLLIElement {

    const item_element =
        document.createElement("li");
    const buy_button =
        document.createElement("button");
    const div =
        document.createElement("div");
    const desc_div =
        document.createElement("div");
    const p_desc =
        document.createElement("p");
    const p_stat =
        document.createElement("p");

    const item_text = document.createTextNode
        (`${item.name}, ${item.cost}${CURRENCY_TEXT}`);
    const stats = document.createTextNode
        (stat_text);
    const desc = document.createTextNode
        (item.desc);

    buy_button.onclick = click_action;

    const id = item_type + item.id;

    // List item: list_item1
    item_element
        .setAttribute("id", "list_" + id);
    // Button: button_pps_item0
    buy_button
        .setAttribute("id", "button_" + id);
    // Stats string: p_stat_item3
    p_stat
        .setAttribute("id", "p_stat_" + id);
    // Desc string: p_pps_item2
    p_desc
        .setAttribute("id", "p_" + id);
    // Div with stats text: desc_div_item5
    desc_div
        .setAttribute("id", "desc_div_" + id);
    // Div with element: div_item5
    div
        .setAttribute("id", "div_" + id);

    buy_button.appendChild(item_text);

    p_stat.appendChild(stats);
    p_desc.appendChild(desc);

    desc_div.appendChild(p_desc);
    desc_div.appendChild(p_stat);

    if (item_type == "pps_item") {
        const p_producing = document.createElement("p");
        // Number of pps that item is produing: p_producing_pps_item3
        p_producing
            .setAttribute("id", "p_producing_" + id);
        desc_div.appendChild(p_producing);
    }

    div.appendChild(buy_button);
    div.appendChild(desc_div);

    item_element.appendChild(div);

    return item_element;
}

//===========================================//

type ActionType
    = "multiplier"
    | "tap_power"
    | "tap_power_multiplier";

type ShowConditionType
    = "has_upgrade"
    | "has_pps_upgrade"
    | "has_pps"
    | "has_current_pp"
    | "total_pp";

type ShowCondition = {
    type: ShowConditionType,
    value: number,
    amount?: number;
}

type PpsUpgrade = {
    id: number,
    name: string,
    desc: string,
    cost: number,
    gives: number,
    show_conditions?: ShowCondition[]
}

type GeneralUpgrade = {
    id: number,
    name: string,
    stat: string,
    desc: string,
    cost: number,
    action: {
        type: ActionType,
        value: number,
        item_ids?: number[]
    },
    show_conditions?: ShowCondition[]
}

type Key = {
    key: string,
    is_down: boolean
}

type Settings = {
    keys: Key[],
    is_changing_keys: number
}

//===========================================//

class Shop {
    pps_upgrades: PpsUpgrade[] = [
        {
            id: 0,
            name: "Keyboard button",
            desc: "A button on an old keyboard.",
            cost: 80,
            gives: 0.4
        },
        {
            id: 1,
            name: "Trackball",
            desc: "A pointing device.",
            cost: 440,
            gives: 1,
            show_conditions: [
                {
                    type: "has_pps_upgrade",
                    value: 0
                }
            ]
        },
        {
            id: 2,
            name: "Drill",
            desc: "Drill, usually fitted with a driving tool attachment, now fitted with a keyboard.",
            cost: 1960,
            gives: 4,
            show_conditions: [
                {
                    type: "has_pps_upgrade",
                    value: 1,
                    amount: 2
                }
            ]
        },
        {
            id: 3,
            name: "Vaxei",
            desc: "The following readme will serve to document all of Vaxei's skins.",
            cost: 9420,
            gives: 10,
            show_conditions: [
                {
                    type: "has_pps_upgrade",
                    value: 2,
                    amount: 3
                }
            ]
        },
        {
            id: 4,
            name: "Cookiezi",
            desc: "Shigetora, better known online as chocomint and formerly as Cookiezi, is a famous South Korean osu!standard player.",
            cost: 74500,
            gives: 55,
            show_conditions: [
                {
                    type: "has_pps_upgrade",
                    value: 3,
                    amount: 5
                }
            ]
        }
    ]

    general_upgrades: GeneralUpgrade[] = [
        {
            id: 0,
            name: "Spicy ramen",
            desc: "You start to sweat.",
            stat: `+0.6 ${TAP_POWER_TEXT}`,
            cost: 520,
            action: {
                type: "tap_power",
                value: 0.6
            }
        },
        {
            id: 1,
            name: "Bateron switch",
            desc: "You order some switches.",
            stat: "Keyboard buttons are thrice more effective.",
            cost: 1340,
            action: {
                type: "multiplier",
                item_ids: [0],
                value: 3
            },
            show_conditions: [
                {
                    type: "has_pps_upgrade",
                    value: 0,
                    amount: 5
                }
            ]
        },
        {
            id: 2,
            name: "Mousepad",
            desc: "Finally, less mouse drift.",
            stat: `+1.2 ${TAP_POWER_TEXT}`,
            cost: 1800,
            action: {
                type: "tap_power",
                value: 1.2
            },
            show_conditions: [
                {
                    type: "has_upgrade",
                    value: 0
                }
            ]
        },
        {
            id: 3,
            name: "Vacom toilet",
            desc: "10 Reasons Why You Might Want a High-Tech Super Toilet.",
            stat: `+3.2 ${TAP_POWER_TEXT}`,
            cost: 4600,
            action: {
                type: "tap_power",
                value: 3.2
            },
            show_conditions: [
                {
                    type: "has_upgrade",
                    value: 2
                }
            ]
        },
        {
            id: 4,
            name: "Power outlet",
            desc: "The consequences of industrial revolution.",
            stat: "Logitech and drill become twice as effective.",
            cost: 10640,
            action: {
                type: "multiplier",
                item_ids: [1, 2],
                value: 2
            },
            show_conditions: [
                {
                    type: "has_pps_upgrade",
                    value: 1,
                    amount: 4
                },
                {
                    type: "has_pps_upgrade",
                    value: 2,
                    amount: 2
                }
            ]
        },
        {
            id: 5,
            name: "Sugar",
            desc: "The generic name for sweet-tasting, soluble carbohydrates, many of which are used in food.",
            stat: "Vaxei becomes twice as effective.",
            cost: 18900,
            action: {
                type: "multiplier",
                item_ids: [3],
                value: 2
            },
            show_conditions: [
                {
                    type: "has_upgrade",
                    value: 4,
                    amount: 4
                }
            ]
        },
        {
            id: 6,
            name: "Mooting",
            desc: "You finally receive your Mooting keyboard.",
            stat: "Click power is doubled.",
            cost: 23200,
            action: {
                type: "tap_power_multiplier",
                value: 2
            },
            show_conditions: [
                {
                    type: "has_upgrade",
                    value: 5
                }
            ]
        },
        {
            id: 7,
            name: "Cookiezi comeback",
            desc: "Chocomint's Made of Fire HDDT 98.54 full combo. Without a doubt, one of the most impressive plays ever set in osu! history, but one that takes some experience to appreciate fully.",
            stat: "Cookiezi becomes twice as effective.",
            cost: 69420,
            action: {
                type: "multiplier",
                item_ids: [4],
                value: 2
            },
            show_conditions: [
                {
                    type: "has_upgrade",
                    value: 6,
                    amount: 3
                }
            ]
        }
    ]

    pps_upgrades_bought: number[];
    upgrades_bought: number[];

    constructor() {
        this.pps_upgrades_bought = new Array<number>(this.pps_upgrades.length).fill(0);
        this.upgrades_bought = new Array<number>(this.general_upgrades.length).fill(0);
    }

    get_multipliers(): Array<number> {
        const result_array = new Array<number>(this.pps_upgrades.length).fill(1);

        for (const s in this.general_upgrades) {
            const i = parseInt(s, 10);
            if (this.upgrades_bought[i] === 0) continue;
            const upgrade = this.general_upgrades[i]!;

            if (upgrade.action.type === "multiplier") {
                for (const j in upgrade.action.item_ids!) {
                    const id = upgrade.action.item_ids[j]!;
                    result_array[id] *= this.upgrades_bought[upgrade.id]! * upgrade.action.value;
                }
            }
        }
        return result_array;
    }

    calc_pps(): number {
        const multipliers = this.get_multipliers()!;
        assert("multipliers is valid length", multipliers.length === this.pps_upgrades.length);
        return this.pps_upgrades_bought
            .map((a, i) => a * this.pps_upgrades[i]!.gives * multipliers[i]!)
            .reduce((a, b) => a + b);
    }

    calc_tap_power(): number {
        let result = 1;
        let multiplier = 1;

        for (const s in this.upgrades_bought) {
            const i = parseInt(s, 10);
            if (this.upgrades_bought[i] === 0) continue;
            const upgrade = this.general_upgrades[i];

            switch (upgrade?.action.type) {
                case "tap_power": {
                    result += upgrade.action.value * this.upgrades_bought[i]!;
                } break;
                case "tap_power_multiplier": {
                    multiplier *= upgrade.action.value * this.upgrades_bought[i]!;
                } break;
            }
        }
        return result * multiplier;
    }

    buy(item: GeneralUpgrade): void {
        this.upgrades_bought[item.id] += 1;

        const button = document.getElementById("button_item" + item.id) as HTMLButtonElement;
        button.disabled = true;
    }

    buy_pps(item: PpsUpgrade): void {
        this.pps_upgrades_bought[item.id] += 1;
        this.pps_upgrades[item.id]!.cost = Math.floor(this.pps_upgrades[item.id]!.cost * PPS_COST_MULTIPLIER);
    }
}

class Cookiezi {
    private amount: number;
    private total: number;
    private power: number;
    private pps: number;

    settings: Settings;
    shop: Shop;

    constructor(shop: Shop) {
        this.amount = 0;
        this.total = 0;

        this.power = 1;
        this.pps = 0;

        this.shop = shop;

        this.settings = {
            keys: [
                {
                    key: "z",
                    is_down: false
                },
                {
                    key: "x",
                    is_down: false
                },
            ],
            is_changing_keys: -1
        }

        assert("settings.keys is of KEY_COUNT size", this.settings.keys.length === KEY_COUNT);
    }

    last_inactive_time = 0;

    clicks = {
        stopped_interval: 0,
        is_tapping: false,
        tapped: 0,
        ticks: TPS
    }

    get_pps(): number {
        return this.pps;
    }

    get_pp(): number {
        return this.amount;
    }

    get_total(): number {
        return this.total;
    }

    initialize_shop(): void {
        for (const s in this.shop.pps_upgrades) {
            const i = parseInt(s, 10);
            const item = this.shop.pps_upgrades[i]!;
            const item_element = make_shop_item(item, `+${item.gives} ${CURRENCY_TEXT}/s`, "pps_item", this.buy_pps(item));

            if (item.show_conditions) item_element.hidden = true;
            PPS_SHOP_ITEMS_LIST_ELEMENT.appendChild(item_element);
        }

        for (const s in this.shop.general_upgrades) {
            const i = parseInt(s, 10);
            const item = this.shop.general_upgrades[i]!;
            const item_element = make_shop_item(item, item.stat, "item", this.buy(item));

            if (item.show_conditions) item_element.hidden = true;
            GENERAL_SHOP_ITEMS_LIST_ELEMENT.appendChild(item_element);
        }
    }

    check_item_conditions(item: GeneralUpgrade | PpsUpgrade): boolean {
        for (const s in item.show_conditions!) {
            const i = parseInt(s, 10);
            const cond = item.show_conditions[i]!;

            switch (cond.type) {
                case "has_pps": {
                    if (this.get_pps() < cond.value)
                        return false;
                } break;
                case "has_pps_upgrade": {
                    assert("has_pps_upgrade value is not out of range",
                        cond.value < this.shop.pps_upgrades_bought.length);
                    if (this.shop.pps_upgrades_bought[cond.value]! < (cond.amount || 1)) {
                        return false;
                    }
                } break;
                case "has_current_pp": {
                    if (this.get_pp() < cond.value) {
                        return false;
                    }
                } break;
                case "has_upgrade": {
                    assert("has_upgrade value is not out of range",
                        cond.value < this.shop.upgrades_bought.length);
                    if (this.shop.upgrades_bought[cond.value]! < 1) {
                        return false;
                    }
                } break;
                case "total_pp": {
                    if (this.get_total() < cond.value) {
                        return false;
                    }
                } break;
            }
        }
        return true;
    }

    // TODO: encapsulation Am I Right
    // TODO: these can be optimized by updating a particular item instead of everything
    update_shop_element() {
        for (const s in this.shop.upgrades_bought) {
            const i = parseInt(s, 10);
            const item = this.shop.general_upgrades[i]!;

            // Disable the button if you bought that upgrade.
            if (this.shop.upgrades_bought[i]! > 0) {
                const button = document
                    .getElementById("button_item" + item.id) as HTMLButtonElement;

                button.disabled = true;
            }

            const li = document
                .getElementById("list_item" + item.id) as HTMLLIElement;

            // TODO: replace li.hiddem with item.available
            if (item.show_conditions && li.hidden) {
                if (this.check_item_conditions(item)) {
                    li.hidden = false;
                }
            } else {
                li.hidden = false;
            }
        }
    }

    update_pps_shop_element(this: Cookiezi) {
        const multipliers = this.shop.get_multipliers();
        for (const s in this.shop.pps_upgrades_bought) {
            const i = parseInt(s, 10);
            const item = this.shop.pps_upgrades[i]!;

            const button = document
                .getElementById("button_pps_item" + item.id) as HTMLButtonElement;
            const stat = document
                .getElementById("p_stat_pps_item" + item.id) as HTMLParagraphElement;

            const count = this.shop.pps_upgrades_bought[item.id]!;

            button.textContent =
                `${item.name}, ${format_number(item.cost, 0)}${CURRENCY_TEXT}`;
            stat.textContent =
                `+${format_number(item.gives * multipliers[item.id]!, 1)} ${CURRENCY_TEXT}/s`;

            // TODO: css
            if (count > 0) {
                const producing = document
                    .getElementById("p_producing_pps_item" + item.id) as HTMLParagraphElement;
                const producing_text =
                    `You have ${count}, producing ${format_number(item.gives * count * multipliers[item.id]!, 1)} ${CURRENCY_TEXT}/s`;
                producing.textContent = producing_text;
            }

            const li = document.getElementById("list_pps_item" + item.id) as HTMLLIElement;

            if (item.show_conditions && li.hidden) {
                if (this.check_item_conditions(item)) {
                    li.hidden = false;
                }
            } else {
                li.hidden = false;
            }
        }
    }

    // Buy methods return an action that you can put on a button.
    buy_pps(item: PpsUpgrade): () => void {
        const self = this;
        return function () {
            if (self.amount < item.cost) {
                alert("Not enough " + CURRENCY_TEXT + " to buy \"" + item.name + "\" :(");
                return;
            }
            self.remove_pp(item.cost);

            self.shop.buy_pps(item);
            self.update_shop_element();
            self.update_pps_shop_element();

            self.pps = self.shop.calc_pps();
        }
    }

    buy(item: GeneralUpgrade): () => void {
        const self = this;
        return function () {
            if (self.amount < item.cost) {
                alert("Not enough " + CURRENCY_TEXT + " to buy \"" + item.name + "\" :(");
                return;
            }
            self.remove_pp(item.cost);

            self.shop.buy(item);
            self.update_shop_element();
            self.update_pps_shop_element();

            self.power = self.shop.calc_tap_power();
            self.pps = self.shop.calc_pps();
        }
    }

    // This is to avoid clicking when holding button down.
    press_key(k: Key): void {
        if (k.is_down) return;

        k.is_down = true;
        this.clicks.tapped += 1;
        this.click();

        this.clicks.is_tapping = true;

        clearInterval(this.clicks.stopped_interval);

        this.clicks.stopped_interval = setTimeout(() => {
            this.clicks.is_tapping = false;
        }, 1000)
    }

    unpress_key(k: Key): void {
        k.is_down = false;
    }

    add_pp(amount: number) {
        this.total += amount;
        this.amount += amount;
    }

    remove_pp(amount: number) {
        this.amount -= amount;
    }

    click(): void {
        this.add_pp(this.power);
    }

    invoke_pps(): void {
        this.add_pp(this.pps / TPS);
    }

    update_main_elements(): void {
        const speed = (this.clicks.tapped * TPS_ADJ / this.clicks.ticks);

        // TODO: This doesn't calculate properly.
        BPM_TEXT_ELEMENT.textContent =
            speed > 0 ? Math.floor(speed * 60 / 4) + " BPM" : ":3c";
        AMOUNT_TEXT_ELEMENT.textContent =
            format_number(Math.floor(this.amount), 0) + CURRENCY_TEXT;
        PPS_TEXT_ELEMENT.textContent =
            CURRENCY_TEXT + "/s: " + format_number(this.pps + speed, 1);
        TAP_POWER_TEXT_ELEMENT.textContent =
            TAP_POWER_TEXT + ": " + this.power;
        UPGRADES_COUNT_TEXT_ELEMENT.textContent =
            "Items bought: " + this.shop.pps_upgrades_bought.reduce((a, b) => a + b, 0);
    }

    update_passive_pps(): void {
        this.pps = this.shop.calc_pps();
    }

    update_pps(): void {
        if (this.clicks.is_tapping) {
            this.clicks.ticks += 1;
        } else if (this.clicks.ticks != TPS) {
            // NOTE:
            // TPS is the starting value instead of 0, because CP/s is being calculated as:
            // TOTAL_TAPPED * TPS / TICKS -> TOTAL_TAPPED / SECONDS_PASSED
            this.clicks.tapped = Math.floor(this.clicks.tapped / this.clicks.ticks * TPS_ADJ);
            this.clicks.ticks = TPS;
        } else if (this.clicks.tapped > 0) {
            this.clicks.tapped -= 1;
        }
    }

    update(): void {
        this.invoke_pps();
        this.update_pps();
        this.update_main_elements();
    }
}

//===========================================//

const shop: Shop = new Shop();
const cookiezi: Cookiezi = new Cookiezi(shop);

cookiezi.initialize_shop();

setInterval(() => {
    cookiezi.update();
}, 1000 / TPS)

document.addEventListener("keydown", (k) => {
    const k1 = cookiezi.settings.keys[0]!;
    const k2 = cookiezi.settings.keys[1]!;

    if (cookiezi.settings.is_changing_keys >= 0) {
        cookiezi.settings.keys[cookiezi.settings.is_changing_keys]!.key = k.key;

        cookiezi.settings.is_changing_keys += 1;
        KEYS_TEXT_ELEMENT.textContent = make_current_keys_text(k1.key, k2.key, cookiezi.settings.is_changing_keys);

        if (cookiezi.settings.is_changing_keys >= KEY_COUNT) {
            cookiezi.settings.is_changing_keys = -1;
            CHANGE_KEYS_BUTTON_ELEMENT.textContent = CHANGE_KEYS_TEXT;
        }
        return;
    }

    switch (k.key.toLowerCase()) {
        case k1.key: {
            cookiezi.press_key(k1);
        } break;
        case k2.key: {
            cookiezi.press_key(k2);
        } break;
    }
});

document.addEventListener("keyup", (k) => {
    const k1 = cookiezi.settings.keys[0]!;
    const k2 = cookiezi.settings.keys[1]!;

    switch (k.key.toLowerCase()) {
        case k1.key: {
            cookiezi.unpress_key(k1);
        } break;
        case k2.key: {
            cookiezi.unpress_key(k2);
        } break;
    }
});

CHANGE_KEYS_BUTTON_ELEMENT.onclick = () => {
    const k1 = cookiezi.settings.keys[0]!;
    const k2 = cookiezi.settings.keys[1]!;

    cookiezi.settings.is_changing_keys = 0;
    KEYS_TEXT_ELEMENT.textContent = make_current_keys_text(k1.key, k2.key, cookiezi.settings.is_changing_keys);
    CHANGE_KEYS_BUTTON_ELEMENT.textContent = CHANGING_KEYS_TEXT;
}

// Invoke CP/s even when tab is inactive
window.onfocus = () => {
    const current_time = new Date().getTime();
    const time_difference = current_time - cookiezi.last_inactive_time;
    if (time_difference > 1000) {
        cookiezi.add_pp(cookiezi.get_pps() * (time_difference / 1000));
    }
}

window.onblur = () => {
    cookiezi.last_inactive_time = new Date().getTime();
}
