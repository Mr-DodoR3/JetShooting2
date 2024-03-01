const MISSION_DATA = [
  [
    // tag : 読み込み画像, pieces : 生成機数, action_type : 行動パターン, interval : 生成間隔, sleep : 次のグループの生成までの間隔
    { tag : "iac1", pieces : 3, action_type : 0, interval : 45, sleep : 180, repletion : "" },
    { tag : "iac1", pieces : 3, action_type : 0, interval : 45, sleep : 180, repletion : "" },
    { tag : "iac1", pieces : 2, action_type : 1, interval : 45, sleep : 90, repletion : "" },
    { tag : "iac1", pieces : 2, action_type : 1, interval : 45, sleep : 180, repletion : "" },
    { tag : "yig21", pieces : 1, action_type : 3, interval : 0, sleep : 0, repletion : "" },
    { tag : "yig21", pieces : 1, action_type : 4, interval : 0, sleep : 90, repletion : "" },
    { tag : "yig21", pieces : 1, action_type : 3, interval : 0, sleep : 0, repletion : "" },
    { tag : "yig21", pieces : 1, action_type : 4, interval : 0, sleep : 180, repletion : "" }
  ]
  
]

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
    tag : "vtol",
    name_jp : "VTOL",
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
    tag : "flare",
    name_jp : "追加フレアディスペンサ",
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
  {
    tag : "ucav",
    name_jp : "チーミング",
    explanation : ""
  }
];

// spec : [Speed, Reload, Power, Energy];
const WEAPON_DATA = [
  {
    tag : "m601",
    serial : "M601",
    name : "",
    name_jp : "",
    explanation : ""
  },
  {
    tag : "e_m601",
    serial : "M601",
    name : "",
    name_jp : "",
    explanation : ""
  }
];

// spec : [Speed, Defense, Charge];
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
    weapon : "m601",
    specail_weapon : "",
    engine_pos : [2, 45]
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
    skil : ["cft", "flare", "wso"]
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
    spec : [2, 7, 7],
    skil : ["armor", "maintain", "flare"]
  },
  {
    tag : "sy30sm",
    serial : "SY-30SM",
    name : "Babochka",
    name_jp : "バーバチカ(ロシア語で蝶)",
    explanation : "高水準の運動性能と耐久性能を持つ強力な戦闘機です。",
    type : "fighter",
    spec : [10, 5, 4],
    skil : ["supercruise", "vt", "irst", "wso"]
  },
  {
    tag : "va8",
    serial : "VA-8GR",
    name : "SuperKestrel",
    name_jp : "スーパーケストレル",
    explanation : "珍しい垂直離着陸能力を持つ攻撃機です。",
    type : "attacker",
    spec : [1, 4, 10],
    skil : ["vtol", "armor", "maintain", "flare", "irst"]
  },
  {
    tag : "md4000",
    serial : "MD.4000M",
    name : "Azur",
    name_jp : "アズュール(フランス語で紺碧)",
    explanation : "特徴的な装備はないですが、総合スペックの高い汎用戦闘機です。",
    type : "multirole",
    spec : [8, 6, 6],
    skil : []
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
  },
  {// TFX
    tag : "tf24",
    serial : "MMU-TF-24",
    name : "Kral",
    name_jp : "クラル(トルコ語で王)",
    explanation : "無人機との連携を前提に開発された試作戦闘機です。",
    type : "multirole",
    spec : [6, 6, 3],
    skil : ["stealth", "ucav"]
  }
];

const ENEMY_DATA = [
  {
    tag : "iac1",
    serial : "IA-C1",
    name_jp : "ネッツ(ヘブライ語で鷹)",
    attribute : "air"
  },
  {
    tag : "yig21",
    serial : "YiG-21",
    name_jp : "ストレーラ(ロシア語で矢)",
    attribute : "air"
  },
  {
    tag : "ea314",
    serial : "E-A314",
    name_jp : "スーパーパルダウ(ポルトガル語でスーパー雀)",
    attribute : "air"
  },
  {
    tag : "fs16",
    serial : "FS-16CG",
    name_jp : "マスタングⅡ",
    attribute : "air"
  }
];
