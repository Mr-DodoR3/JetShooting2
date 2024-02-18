const SKIL_DATA = [
  {
    tag : "cft",
    name_jp : "コンフォーマル・フューエル・タンク",
    explanation : ""
  },
  {
    tag : "supercruise",
    name_jp : "スーパークルーズ",
    explanation : ""
  },
  {
    tag : "swingwing",
    name_jp : "可変翼",
    explanation : ""
  },
  {
    tag : "vt",
    name_jp : "推力偏向ノズル",
    explanation : ""
  },
  {
    tag : "asm",
    name_jp : "対艦番長",
    explanation : ""
  },
  {
    tag : "armor",
    name_jp : "防弾装甲",
    explanation : ""
  },
  {
    tag : "maintain",
    name_jp : "現地整備",
    explanation : ""
  },
  {
    tag : "irst",
    name_jp : "IRST",
    explanation : ""
  },
  {
    tag : "stealth",
    name_jp : "ステルス",
    explanation : ""
  },
  {
    tag : "wso",
    name_jp : "兵装システム士官",
    explanation : ""
  },
  {
    tag : "fbl",
    name_jp : "フライ・バイ・ライト",
    explanation : ""
  },
  {
    tag : "coin",
    name_jp : "COIN機",
    explanation : ""
  },
];

const WEAPON_DATA = [
  {
    tag : "",
    serial : "",
    name : "",
    name_jp : "",
    explanation : ""
  }
];

const UNIT_DATA = [
  {
    tag : "fsb18",
    serial : "FS/B-18F",
    name : "CobraⅡ",
    name_jp : "コブラⅡ",
    explanation : "対空対地共に優れた汎用性の高いマルチロール戦闘機です。",
    type : "multirole",
    spec : [5, 5, 5],
    skil : ["cft"],
    weapon : "",
    specail_weapon : ""
  },
  {
    tag : "fi14",
    serial : "FI-14D",
    name : "MightyCat",
    name_jp : "マイティーキャット",
    explanation : "艦隊防空を主眼に置いた重武装の迎撃機です。",
    type : "interceptor",
    spec : [4, 6, 10],
    skil : ["swingwing", "irst", "wso"]
  },
  {
    tag : "b15",
    serial : "B-15E",
    name : "Strike",
    name_jp : "ストライク",
    explanation : "FS-15制空戦闘機を元に開発された生存性の高い爆撃機です。",
    type : "bomber",
    spec : [3, 10, 6],
    skil : ["cft", "wso"]
  },
  {
    tag : "xfs23",
    serial : "XFS-23A",
    name : "Rapier",
    name_jp : "レイピア",
    explanation : "ステルス性や超音速巡航性能などの最新機能を備えた高性能戦闘機です。",
    type : "fighter",
    spec : [9, 2, 5],
    skil : ["supercruise", "vt", "stealth"]
  },
  {
    tag : "sy25",
    serial : "SY-25TM",
    name : "Volk",
    name_jp : "ヴォルク(ロシア語で狼)",
    explanation : "対地攻撃力が優秀な攻撃機です。",
    type : "attacker",
    spec : [1, 8, 8],
    skil : ["armor", "maintain"]
  },
  {
    tag : "sy30sm",
    serial : "SY-30SM",
    name : "Babochka",
    name_jp : "バーバチカ(ロシア語で蝶)",
    explanation : "高水準の運動性能と耐久性能を持つ強力な戦闘機です。",
    type : "fighter",
    spec : [10, 7, 4],
    skil : ["supercruise", "vt", "irst", "wso"]
  },
  {
    tag : "md4000",
    serial : "MD.4000M",
    name : "Azur",
    name_jp : "アズュール(フランス語で紺碧)",
    explanation : "軽量で運動性能特化の汎用戦闘機です。",
    type : "multirole",
    spec : [8, 4, 4],
    skil : ["supercruise", "maintain"]
  },
  {
    tag : "al159",
    serial : "AL-159",
    name : "Luna",
    name_jp : "ルナ(チェコ語で月)",
    explanation : "癖はないですが、攻撃力が低く実戦には向かない練習機です。",
    type : "trainer",
    spec : [3, 3, 3],
    skil : ["maintain", "coin"]
  },
  {
    tag : "ab2",
    serial : "AB2M1",
    name : "Ryoufuu",
    name_jp : "涼風",
    explanation : "対艦攻撃も想定され開発された高い攻撃力を持つ攻撃機です。",
    type : "attacker",
    spec : [7, 2, 9],
    skil : ["asm", "fbl"]
  },
  {
    tag : "jin20",
    serial : "JIN-20B",
    name : "Wushi",
    name_jp : "ウーシー(巫師,中国語で魔術師)",
    explanation : "ステルスを持ち、継戦能力に特化した大型戦闘機です。",
    type : "interceptor",
    spec : [3, 8, 4],
    skil : ["cft", "irst", "stealth", "wso"]
  }
];

const ENEMY_DATA = [
  {
    tag : "iac1",
    serial : "IA-C1",
    name_jp : "ネッツ(ヘブライ語で鷹)"
  },
  {
    tag : "yig-21",
    serial : "YiG-21",
    name_jp : "ストレーラ(ロシア語で矢)"
  }
];
