const MISSION_DATA = [
  // stage 1
  [
    // tag : 読み込み画像, pieces : 生成機数, action_type : 行動パターン, interval : 生成間隔, sleep : 次のグループの生成までの間隔, repletion : 特殊設定
    { tag : "iac1", pieces : 3, action_type : 0, interval : 45, sleep : 180, repletion : "" },
    { tag : "iac1", pieces : 3, action_type : 0, interval : 45, sleep : 180, repletion : "" },
    { tag : "iac1", pieces : 2, action_type : 1, interval : 45, sleep : 240, repletion : "" },
    { tag : "iac1", pieces : 2, action_type : 1, interval : 45, sleep : 180, repletion : "" },
    { tag : "yig21", pieces : 1, action_type : 3, interval : 0, sleep : 0, repletion : "" },
    { tag : "yig21", pieces : 1, action_type : 4, interval : 0, sleep : 240, repletion : "" },
    { tag : "yig21", pieces : 1, action_type : 3, interval : 0, sleep : 0, repletion : "" },
    { tag : "yig21", pieces : 1, action_type : 4, interval : 0, sleep : 240, repletion : "" },
    { tag : "iac1", pieces : 2, action_type : 2, interval : 45, sleep : 180, repletion : "" },
    { tag : "iac1", pieces : 2, action_type : 1, interval : 45, sleep : 180, repletion : "" },
    { tag : "iac1", pieces : 4, action_type : 2, interval : 60, sleep : 180, repletion : "" }
  ],

  // stage 2
  [
    {}
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
  },
  {
    tag : "auto",
    name_jp : "オートパイロット",
    explanation : "衝突ダメージの減少"
  },
  {
    tag : "reverser",
    name_jp : "スラストリバーサ",
    explanation : ""
  },
  {
    tag : "nuclear",
    name_jp : "ジニー",
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
    explanation : "",
    power : 20,
    reload : 4,
    en : 20
  },
  {
    tag : "eml12",
    serial : "EML-12C",
    name : "",
    name_jp : "",
    explanation : "レールガン",
    power : 50,
    reload : 10,
    en : 50
  },
  {
    tag : "l47",
    serial : "L-47",
    name : "",
    name_jp : "",
    explanation : "やや横に広がるレーザー",
    power : 15,
    reload : 6,
    en : 30
  },
  {
    tag : "m6",
    serial : "M6",
    name : "",
    name_jp : "",
    explanation : "火炎放射",
    power : 100,
    reload : 4,
    en : 30
  },
  {
    tag : "gs60",
    serial : "GS-60-3",
    name : "",
    name_jp : "",
    explanation : "斜めと後ろに撃つやつ",
    power : 40,
    reload : 10,
    en : 40
  },
  {
    tag : "l50",
    serial : "L-50",
    name : "",
    name_jp : "",
    explanation : "高速弾",
    power : 20,
    reload : 2,
    en : 15
  },
  {
    tag : "asraab",
    serial : "ASRAAB",
    name : "",
    name_jp : "",
    explanation : "3連装ショット",
    power : 45,
    reload : 15,
    en : 95
  },
  {
    tag : "pj234",
    serial : "PJ234",
    name : "",
    name_jp : "",
    explanation : "広範囲にばらまくクラスター弾",
    power : 0,
    reload : 2,
    en : 40
  },
  {
    tag : "type25",
    serial : "Type-25",
    name : "",
    name_jp : "",
    explanation : "爆発系ミサイル",
    power : 50,
    reload : 12,
    en : 50
  },
  {
    tag : "atm144",
    serial : "ATM-144D",
    name : "",
    name_jp : "",
    explanation : "マイクロミサイル(無誘導)",
    power : 50,
    reload : 5,
    en : 20
  },
  {
    tag : "kkh76",
    serial : "KKh-76",
    name : "",
    name_jp : "",
    explanation : "サイン波に合わせて動く弾",
    power : 30,
    reload : 4,
    en : 15
  },
  {
    tag : "malc",
    serial : "MALC",
    name : "",
    name_jp : "",
    explanation : "4連装で扇形にばらまく弾",
    power : 25,
    reload : 5,
    en : 35
  },
  {
    tag : "gua99",
    serial : "GUA-99",
    name : "",
    name_jp : "",
    explanation : "6連装で全て真正面に撃つ弾",
    power : 10,
    reload : 8,
    en : 35
  },
  {
    tag : "jdal",
    serial : "JDAL",
    name : "",
    name_jp : "",
    explanation : "2連装高威力キャノン",
    power : 65,
    reload : 16,
    en : 130
  },
  {// ここから先未実装
    tag : "lrac",
    serial : "LRAC",
    name : "",
    name_jp : "",
    explanation : "横に広がる(物理)単発弾",
    power : 0,
    reload : 1,
    en : 30
  },
  {
    tag : "hel",
    serial : "HLE Block2",
    name : "",
    name_jp : "",
    explanation : "高速レーザー",
    power : 0,
    reload : 1,
    en : 30
  },
  {
    tag : "atntl",
    serial : "ATNTL",
    name : "",
    name_jp : "",
    explanation : "貫通弾",
    power : 0,
    reload : 1,
    en : 30
  },
  {
    tag : "e_m601",
    serial : "M601",
    name : "",
    name_jp : "",
    explanation : "",
    power : 40
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
    skil : ["cft", "auto"],
    weapon : "eml12",
    specail_weapon : "l47",
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
    skil : ["swingwing", "irst", "wso"],
    weapon : "malc",
    specail_weapon : "jdal",
    engine_pos : [5, 45]
  },
  {
    tag : "b15",
    serial : "B-15E",
    name : "Strike",
    name_jp : "ストライク",
    explanation : "FS-15制空戦闘機を元に開発された生存性の高い爆撃機です。",
    type : "bomber",
    spec : [3, 10, 6],
    skil : ["cft", "flare", "wso"],
    weapon : "m6",
    specail_weapon : "pj234",
    engine_pos : [3, 43]
  },
  {
    tag : "xfs23",
    serial : "XFS-23A",
    name : "Rapier",
    name_jp : "レイピア",
    explanation : "ステルス性や超音速巡航性能などの最新機能を備えた高性能戦闘機です。",
    type : "fighter",
    spec : [9, 2, 5],
    skil : ["supercruise", "vt", "stealth", "auto"],
    weapon : "l50",
    specail_weapon : "l47",
    engine_pos : [4, 42]
  },
  {
    tag : "sy25",
    serial : "SY-25TM",
    name : "Volk",
    name_jp : "ヴォルク(ロシア語で狼)",
    explanation : "対地攻撃力が優秀な攻撃機です。",
    type : "attacker",
    spec : [2, 7, 7],
    skil : ["armor", "maintain", "flare"],
    weapon : "m601",
    specail_weapon : "asraab",
    engine_pos : [3, 30]
  },
  {
    tag : "sy30sm",
    serial : "SY-30SM",
    name : "Babochka",
    name_jp : "バーバチカ(ロシア語で蝶)",
    explanation : "高水準の運動性能と耐久性能を持つ強力な戦闘機です。",
    type : "fighter",
    spec : [10, 5, 4],
    skil : ["supercruise", "vt", "irst", "wso", "auto"],
    weapon : "eml12",
    specail_weapon : "kkh76",
    engine_pos : [3, 43]
  },
  {
    tag : "va8",
    serial : "VA-8GR",
    name : "SuperKestrel",
    name_jp : "スーパーケストレル",
    explanation : "珍しい垂直離着陸能力を持つ攻撃機です。",
    type : "attacker",
    spec : [1, 4, 10],
    skil : ["vtol", "armor", "maintain", "flare", "irst"],
    weapon : "kkh76",
    specail_weapon : "jdal",
    engine_pos : [2, 27]
  },
  {
    tag : "md4000",
    serial : "MD.4000M",
    name : "Azur",
    name_jp : "アズュール(フランス語で紺碧)",
    explanation : "特徴的な装備はないですが、総合スペックの高い汎用戦闘機です。",
    type : "multirole",
    spec : [8, 6, 6],
    skil : ["supercruise"],
    weapon : "gua99",
    specail_weapon : "malc",
    engine_pos : [2, 45]
  },
  {
    tag : "al159",
    serial : "AL-159",
    name : "Luna",
    name_jp : "ルナ(チェコ語で月)",
    explanation : "癖はないですが、攻撃力が低く実戦には向かない練習機です。",
    type : "trainer",
    spec : [3, 3, 3],
    skil : ["maintain", "coin"],
    weapon : "m601",
    specail_weapon : "gs60",
    engine_pos : [2, 38]
  },
  {
    tag : "ab2",
    serial : "AB2M1",
    name : "Ryoufuu",
    name_jp : "涼風",
    explanation : "対艦攻撃も想定され開発された高い攻撃力を持つ攻撃機です。",
    type : "attacker",
    spec : [7, 2, 9],
    skil : ["asm", "fbl"],
    weapon : "gua99",
    specail_weapon : "type25",
    engine_pos : [2, 45]
  },
  {
    tag : "jin20",
    serial : "JIN-20B",
    name : "Wushi",
    name_jp : "ウーシー(巫師,中国語で魔術師)",
    explanation : "ステルスを持ち、継戦能力に特化した大型戦闘機です。",
    type : "interceptor",
    spec : [3, 8, 4],
    skil : ["cft", "irst", "stealth", "wso"],
    weapon : "m6",
    specail_weapon : "atm144",
    engine_pos : [2, 45]
  },
  {// TFX
    tag : "tf24",
    serial : "MMU-TF-24",
    name : "Kral",
    name_jp : "クラル(トルコ語で王)",
    explanation : "無人機との連携を前提に開発された試作戦闘機です。",
    type : "multirole",
    spec : [6, 6, 3],
    skil : ["stealth", "ucav"],
    weapon : "malc",
    specail_weapon : "asraab",
    engine_pos : [2, 41]
  },
  {// テスト用
    tag : "al159",
    serial : "TEST",
    name : "Kral",
    name_jp : "クラル(トルコ語で王)",
    explanation : "無人機との連携を前提に開発された試作戦闘機です。",
    type : "multirole",
    spec : [6, 6, 3],
    skil : ["stealth", "ucav"],
    weapon : "malc",
    specail_weapon : "asraab",
    engine_pos : [2, 41]
  },
  {// テスト用
    tag : "tf24",
    serial : "TEST",
    name : "Kral",
    name_jp : "クラル(トルコ語で王)",
    explanation : "無人機との連携を前提に開発された試作戦闘機です。",
    type : "multirole",
    spec : [6, 6, 3],
    skil : ["stealth", "ucav"],
    weapon : "malc",
    specail_weapon : "asraab",
    engine_pos : [2, 41]
  },
  {// テスト用
    tag : "b15",
    serial : "TEST",
    name : "Kral",
    name_jp : "クラル(トルコ語で王)",
    explanation : "無人機との連携を前提に開発された試作戦闘機です。",
    type : "multirole",
    spec : [6, 6, 3],
    skil : ["stealth", "ucav"],
    weapon : "malc",
    specail_weapon : "asraab",
    engine_pos : [2, 41]
  }
];
// 追加候補
// fighter : MiG-1.44
// interceptor : CF-105
// bomber : X-44
// bomber : Tornado IDS
// trainer : IAR 99 or multirole : JAS-39
// trainer : T-50

const ENEMY_DATA = [
  {
    tag : "iac1",
    serial : "IA-C1",
    name_jp : "ネッツ(ヘブライ語で鷹)",
    attribute : "air",
    hp : 100
  },
  {
    tag : "yig21",
    serial : "YiG-21",
    name_jp : "ストレーラ(ロシア語で矢)",
    attribute : "air",
    hp : 60
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
  },
  {
    tag : "yig29",
    serial : "YiG-29S",
    name_jp : "",
    attribute : "air"
  },
  {
    tag : "me300",      // HA 300
    serial : "Me-300",
    name_jp : "",
    attribute : "air"
  }
];
