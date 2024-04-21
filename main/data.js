const MISSION_DATA = [
  // stage 1
  [
    // tag : 読み込み画像, pieces : 生成機数, action_type : 行動パターン, interval : 生成間隔, sleep : 次のグループの生成までの間隔, repletion : 特殊設定
    { boss_count : 2, map : "sae", pos : [592, 287], title : "完全平和の消失", overview : "冷戦が終結して15年...\n2つの超大国を中心として結成された\"新国連\"によって世界は安\n定を取り戻した。\nしかしながら、新国連の存在を快く思わない各地の反乱勢力が結\n託し\"自由同盟\"を結成した。" },
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
    { tag : "iac1", pieces : 4, action_type : 2, interval : 60, sleep : 180, repletion : "" },
    { tag : "turbulence", pieces : 1, action_type : 1000, interval : 0, sleep : 180, repletion : "boss" },
    { tag : "turbulence", pieces : 1, action_type : 1001, interval : 0, sleep : 0, repletion : "" }
  ],

  // stage 2
  [
    { pos : [720, 270], title : "超大国の幸福理論", overview : "none" }
  ],

  // stage 3
  [
    { pos : [720, 270], title : "誰かの希望になれるなら", overview : "none" }
  ],

  // stage 4
  [
    { pos : [720, 270], title : "深海艦隊", overview : "none" }
  ],

  // stage 5
  [
    { pos : [720, 270], title : "アスノカケラ", overview : "none" }
  ],

  // stage 6
  [
    { pos : [720, 270], title : "60マイルと一夜作戦", overview : "none" }
  ],

  // stage 7
  [
    { pos : [720, 270], title : "核の惑星", overview : "none" }
  ],

  // stage 8
  [
    { pos : [720, 270], title : "地球最後の戦争を", overview : "none" }
  ]
]

const SKIL_DATA = [
  {
    tag : "cft",
    name_jp : "コンフォーマル・フューエル・タンク",
    explanation : "最大エネルギーチャージ量を30%向上させます。"
  },
  {
    tag : "supercruise",
    name_jp : "スーパークルーズ",
    explanation : "オーグメンター使用後のタイムラグを半減させます。"
  },
  {
    tag : "swingwing",
    name_jp : "可変翼",
    explanation : "オーグメンター持続時間が20%向上、アイテム効果を25%減少させます。"
  },
  {
    tag : "vtol",
    name_jp : "VTOL",
    explanation : "オーグメンター使用時、VTOLモードになります。"
  },
  {
    tag : "vt",
    name_jp : "推力偏向ノズル",
    explanation : "オーグメンター時の運動性能が40%向上、反応速度を50%向上させます。"
  },
  {
    tag : "asm",
    name_jp : "対艦番長",
    explanation : "対艦目標に対する攻撃力を40%向上させます。"
  },
  {
    tag : "armor",
    name_jp : "防弾装甲",
    explanation : "ダメージを20%減少させます。"
  },
  {
    tag : "maintain",
    name_jp : "現地整備",
    explanation : "アイテム効果を25%増加させます。"
  },
  {
    tag : "flare",
    name_jp : "追加フレアディスペンサ",
    explanation : "フレアの残弾を1つ増やします。"
  },
  {
    tag : "irst",
    name_jp : "IRST",
    explanation : "ステルス目標を探知できます。"
  },
  {
    tag : "stealth",
    name_jp : "ステルス",
    explanation : "自機の当たり判定を減少させます。"
  },
  {
    tag : "wso",
    name_jp : "兵装システム士官",
    explanation : "種別による攻撃力補正を10%向上させます。"
  },
  {
    tag : "fbl",
    name_jp : "フライ・バイ・ライト",
    explanation : "機体の反応速度を100%向上させます。"
  },
  {
    tag : "coin",
    name_jp : "COIN機",
    explanation : "スコア獲得量を10%増やします。"
  },
  {
    tag : "ucav",
    name_jp : "チーミング",
    explanation : "無人戦闘機が随伴します。"
  },
  {
    tag : "auto",
    name_jp : "オートパイロット",
    explanation : "衝突ダメージを減少させます。"
  },
  {
    tag : "reverser",
    name_jp : "スラストリバーサ",
    explanation : "後退する速度が上がります。"
  },
  {
    tag : "aesa",
    name_jp : "AESAレーダー",
    explanation : "レーダースキャン間隔を短くします。"
  },
  // {
  //   tag : "l_band",
  //   name_jp : "Lバンドレーダー",
  //   explanation : ""
  // }
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
    en : 40
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
    reload : 6,
    en : 35
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
    power : 10,
    reload : 14,
    en : 60
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
    reload : 10,
    en : 40
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
  {
    tag : "hel",
    serial : "HLE Block2",
    name : "",
    name_jp : "",
    explanation : "高速レーザー",
    power : 10,
    reload : 1,
    en : 10
  },
  {
    tag : "r53",
    serial : "R.53",
    name : "",
    name_jp : "",
    explanation : "ショットガン",
    power : 10,
    reload : 8,
    en : 30
  },
  {
    tag : "ciasa",
    serial : "CIAS-A",
    name : "",
    name_jp : "",
    explanation : "広範囲にばらまく",
    power : 30,
    reload : 2,
    en : 15
  },
  {
    tag : "rb88",
    serial : "RB88",
    name : "",
    name_jp : "",
    explanation : "単発で特徴がないやつ",
    power : 5,
    reload : 6,
    en : 15
  },
  {
    tag : "tcc2",
    serial : "TCC-2",
    name : "",
    name_jp : "",
    explanation : "",
    power : 35,
    reload : 6,
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
    // weapon : "tcc2",
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
    weapon : "type25",
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
    serial : "FS-23A",
    name : "Rapier",
    name_jp : "レイピア",
    explanation : "ステルス性や超音速巡航性能などの最新機能を備えた高性能戦闘機です。",
    type : "fighter",
    spec : [9, 2, 5],
    skil : ["supercruise", "vt", "stealth", "aesa"],
    weapon : "l50",
    specail_weapon : "l47",
    engine_pos : [4, 42]
  },
  {
    tag : "xb44",
    serial : "XB-44A",
    name : "Meteorite",
    name_jp : "ミーティアライト(隕石)",
    explanation : "高いステルス性と搭載量を備えた新型戦闘爆撃機です。",
    type : "bomber",
    spec : [4, 7, 10],
    skil : ["supercruise", "vt", "irst","stealth", "fbl", "auto", "aesa"],
    weapon : "hel",
    specail_weapon : "atm144",
    engine_pos : [0, 0]
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
    specail_weapon : "r53",
    engine_pos : [3, 43]
  },
  {
    tag : "yig144",
    serial : "YIG-144S",
    name : "Avrora",
    name_jp : "アヴローラ(ロシア語でオーロラ)",
    explanation : "ステルス性はないが、全体的に高水準な最新鋭の制空戦闘機です。",
    type : "fighter",
    spec : [6, 6, 6],
    skil : ["cft", "supercruise", "vt", "irst", "auto", "aesa"],
    weapon : "malc",
    specail_weapon : "l50",
    engine_pos : [0, 0]
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
    tag : "isd",
    serial : "ISD-4GR",
    name : "SpruhRegen",
    name_jp : "シュプリューレーゲン(ドイツ語で霧雨)",
    explanation : "可変翼を備え、高い攻撃力を備えた重武装爆撃機です。",
    type : "bomber",
    spec : [2, 6, 8],
    skil : ["swingwing", "flare", "wso", "reverser"],
    weapon : "tcc2",
    specail_weapon : "pj234",
    engine_pos : [0, 0]
  },
  {
    tag : "md4000",
    serial : "MD.4000M",
    name : "Azur",
    name_jp : "アズュール(フランス語で紺碧)",
    explanation : "特徴的な装備はないですが、総合スペックの高いマルチロール戦闘機です。",
    type : "multirole",
    spec : [6, 3, 6],
    skil : ["supercruise", "aesa"],
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
    spec : [2, 2, 2],
    skil : ["maintain", "coin"],
    weapon : "m601",
    specail_weapon : "gs60",
    engine_pos : [2, 38]
  },
  {
    tag : "saas39",
    serial : "SAAS-39NG",
    name : "Frihet",
    name_jp : "フリヘット(スウェーデン語で自由)",
    explanation : "高い運動性能と信頼性がウリの軽量級戦闘機です。",
    type : "interceptor",
    spec : [7, 2, 2],
    skil : ["supercruise", "maintain", "auto", "reverser"],
    weapon : "l50",
    specail_weapon : "asraab",
    engine_pos : [0, 0]
  },
  {
    tag : "ab2",
    serial : "AB2M1",
    name : "Ryoufuu",
    name_jp : "涼風",
    explanation : "対艦攻撃も想定され開発された高い攻撃力を持つ攻撃機です。",
    type : "attacker",
    spec : [7, 2, 6],
    skil : ["asm", "fbl", "aesa"],
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
    skil : ["cft", "irst", "stealth", "wso", "aesa"],
    weapon : "m6",
    specail_weapon : "atm144",
    engine_pos : [2, 45]
  },
  {
    tag : "kat50",
    serial : "KAT-50A",
    name : "Saja",
    name_jp : "サジャ(獅子,韓国語でライオン)",
    explanation : "優秀な火力を持ち、実践でも活躍できる練習機です。",
    type : "trainer",
    spec : [4, 1, 4],
    skil : [],
    weapon : "l47",
    specail_weapon : "gs60",
    engine_pos : [0, 0]
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
  {// SAIA 90
    tag : "sai90",
    serial : "SAI-90",
    name : "Escudo",
    name_jp : "エスクード(スペイン語で盾)",
    explanation : "ステルス性を備えた軽戦闘機です。",
    type : "trainer",
    spec : [5, 4, 1],
    skil : ["stealth"],
    weapon : "tcc2",
    specail_weapon : "ciasa",
    engine_pos : [0, 0]
  }
];
// 追加候補
// fighter : MiG-1.44
// interceptor : JAS 39
// bomber : X-44
// bomber : Tornado IDS
// trainer : T-50
// trainer : SAIA 90

// アメリカ 4+1
// ロシア 2+1
// 西欧 2+1
// 東欧 1+0
// 北欧 0+1
// 東アジア 2+1
// 中東 1+0
// 南米 0+1

const ENEMY_DATA = [
  {
    tag : "iac1",
    serial : "IA-C1",
    name_jp : "ネッツ(ヘブライ語で鷹)",
    importance : "nomal",
    attribute : "air",
    hp : 150,
    score : 100,
    parts : [ ]
  },
  {
    tag : "yig21",
    serial : "YIG-21",
    name_jp : "ストレーラ(ロシア語で矢)",
    importance : "nomal",
    attribute : "air",
    hp : 90,
    score : 100,
    parts : [ ]
  },
  {
    tag : "ea314",
    serial : "E-A314",
    name_jp : "スーパーパルダウ(ポルトガル語でスーパー雀)",
    importance : "nomal",
    attribute : "air",
    hp : 250,
    score : 100,
    stealth : false,
    parts : [ "ea314_propeller" ]
  },
  {
    tag : "fs16",
    serial : "FS-16CG",
    name_jp : "マスタングⅡ",
    importance : "nomal",
    attribute : "air",
    stealth : false,
    parts : [ ]
  },
  {
    tag : "fs35",
    serial : "FS-35C",
    name_jp : "",
    importance : "nomal",
    attribute : "air",
    stealth : true,
    parts : [ ]
  },
  {
    tag : "yig29",
    serial : "YIG-29S",
    name_jp : "",
    importance : "nomal",
    attribute : "air",
    stealth : false,
    parts : [ ]
  },
  {
    tag : "yig35",
    serial : "YIG-35",
    name_jp : "",
    importance : "nomal",
    attribute : "air",
    stealth : false,
    parts : [ ]
  },
  {
    tag : "me300",      // HA 300
    serial : "Me-300",
    name_jp : "",
    importance : "nomal",
    attribute : "air",
    stealth : false,
    parts : [ ]
  },

  {
    tag : "turbulence",      // Halifax
    serial : "Turbulence C.VII",
    name_jp : "",
    importance : "boss",
    attribute : "air",
    hp : 2400,
    score : 2000,
    stealth : false,
    parts : [ "turbulence_propeller", "turbulence_gun", "turbulence_gun" ]
  }
];
