const STORY_DATA = [
  [
    "冷戦が終結して15年...。\n2つの超大国はともに協調し、世界の安定化のために\"新国際連合\"を結成した。\n今までの国連とは違い、2つの超大国の方向性が同じこともあり、\n新国連は非常に強力なものとなっていた。",
    "国連軍の紛争地帯への平和的な介入を積極的に行うなどし、戦争根絶を目指した。\nまた両国は、世界各国の価値観や文化の違いによる蟠りの解決運動にも着手した。\nこうして世界は混沌から統一へと歩み始めた。",
    "しかしながら、2つの超大国を中心とした世界平和を望まない者も多い。\n彼らは旧時代的な考え方から抜け出すことができなかった。\nメディアの使えない彼らは武力蜂起やテロによって自らの主張を押し通そうとした。",
    "彼らの武力蜂起は圧倒的戦力差からことごとく失敗。\nその結果、一部地域を除いて大規模な武力蜂起は減少していくこととなった。\nこれにより民族主義的な人々の希望は消え去り、\n社会主義的価値観が広まっていったかのように思われた。",
    "2つの超大国中心の秩序に反発する世界中の勢力が同時多発的に反乱を起こした。\n\"自由解放同盟\"...世界中で反発した勢力は自らをそう称した。\n彼ら同盟軍はどこからか調達したハイエンド兵器を多数持ち、\n国連軍は鎮圧に手間取ることとなった。",
    "そこで国連軍は空母ドミネーションを中核とする\n第13特別技術試験艦隊と第420特別技術飛行団の実践投入を決定する...。\nこの部隊の詳細は多くが秘匿とされている...。",
    "諸君は第420特別技術飛行団のパイロットとしてテロリストどもをその腕で黙らせてもらいたい。"
  ]
];

const MISSION_DATA = [
  // stage 1
  [
    // tag: 読み込み画像, pieces: 生成機数, action_type: 行動パターン, interval: 生成間隔, sleep: 次のグループの生成までの間隔, repletion: 特殊設定
    {
      boss_count: 2,
      map: "sae",
      pos: [592, 287],
      title: "秩序の消失",
      overview: `同盟軍の爆撃機部隊は国連軍基地に対しての攻撃を決定。\n貴官らの部隊はこれを迎撃せよとの命令を受けることとなる。\nだが、爆撃機部隊には多数の護衛戦闘機も付いていた。`,
      weather: "sunny"
    },
    { tag: "iac1", pieces: 3, action_type: 0, interval: 45, sleep: 180, repletion: "" },
    { tag: "iac1", pieces: 3, action_type: 0, interval: 45, sleep: 180, repletion: "" },
    { tag: "iac1", pieces: 2, action_type: 1, interval: 45, sleep: 240, repletion: "" },
    { tag: "iac1", pieces: 2, action_type: 1, interval: 45, sleep: 180, repletion: "" },
    { tag: "yig21", pieces: 1, action_type: 3, interval: 0, sleep: 0, repletion: "" },
    { tag: "yig21", pieces: 1, action_type: 4, interval: 0, sleep: 240, repletion: "" },
    { tag: "yig21", pieces: 1, action_type: 3, interval: 0, sleep: 0, repletion: "" },
    { tag: "yig21", pieces: 1, action_type: 4, interval: 0, sleep: 240, repletion: "" },
    { tag: "iac1", pieces: 2, action_type: 2, interval: 45, sleep: 180, repletion: "" },
    { tag: "iac1", pieces: 2, action_type: 1, interval: 45, sleep: 180, repletion: "" },
    { tag: "iac1", pieces: 4, action_type: 2, interval: 60, sleep: 180, repletion: "" },
    { tag: "turbulence", pieces: 1, action_type: 1000, interval: 0, sleep: 180, repletion: "boss" },
    { tag: "turbulence", pieces: 1, action_type: 1001, interval: 0, sleep: 0, repletion: "" }
  ],

  // stage 2
  [
    // tag: 読み込み画像, pieces: 生成機数, action_type: 行動パターン, interval: 生成間隔, sleep: 次のグループの生成までの間隔, repletion: 特殊設定
    {
      boss_count: 1,
      map: "land_1",
      pos: [534, 276],
      title: "反撃の鐘",
      overview: `大規模な同盟軍の蜂起により国連軍は防戦一方だった。\nしかしながら、ついに本格的な敵拠点への攻撃の火蓋が切って落\nとされる。\nその前段階として爆撃機部隊の道を築くため、貴官らの部隊には\n敵防空陣地の破壊が命じられる。\n味方電子線妨害機の援護により長射程SAMからの攻撃はない。\nしかしながらそれでも非常に危険な作戦には変わりなかった。`,
      weather: "sunny"
    },
    { tag: "yig21", pieces: 1, action_type: 3, interval: 0, sleep: 0, repletion: "" },
    { tag: "yig21", pieces: 1, action_type: 4, interval: 0, sleep: 90, repletion: "" },
    { tag: "yig21", pieces: 1, action_type: 3, interval: 0, sleep: 0, repletion: "" },
    { tag: "yig21", pieces: 1, action_type: 4, interval: 0, sleep: 90, repletion: "" },
    { tag: "yig21", pieces: 1, action_type: 3, interval: 0, sleep: 0, repletion: "" },
    { tag: "yig21", pieces: 1, action_type: 4, interval: 0, sleep: 90, repletion: "" }
  ],

  // stage 3
  [
    // tag: 読み込み画像, pieces: 生成機数, action_type: 行動パターン, interval: 生成間隔, sleep: 次のグループの生成までの間隔, repletion: 特殊設定
    {
      boss_count: 1,
      map: "sae",
      pos: [509, 231],
      title: "補給ハブを叩け",
      overview: `ユーロ=トランス鉄道の長距離貨物路線は同盟軍に協力し、彼らの\n支援をしているとの情報が入った。\n国連軍は地と空からハブ駅である"ダルスーヤ駅"への攻撃を行う\nが、そこに駐屯する列車要塞"XXXXXX"に行く手を阻まれている。\n貴官ら部隊はこれを破壊せよとの命令を受ける。`
    },
  ],

  // stage 4
  [
    // tag: 読み込み画像, pieces: 生成機数, action_type: 行動パターン, interval: 生成間隔, sleep: 次のグループの生成までの間隔, repletion: 特殊設定
    {
      boss_count: 1,
      map: "sae",
      pos: [504, 274],
      title: "オイルショック",
      overview: `大規模油田施設であるペトーロ油田は同盟軍に対して石油を大量\nに提供していたことが判明した。\n国連軍はこのことを受けペトーロ油田に対しての空爆を決定した。\nその第一陣として貴官らが選ばれたのであった。`
    },
  ],

  // stage 5
  [
    { pos: [720, 270], title: "", overview: `` }
  ],

  // stage 6
  [
    { pos: [720, 270], title: "", overview: `` }
  ],

  // stage 7
  [
    { pos: [720, 270], title: "", overview: `` }
  ],

  // stage 8
  [
    { pos: [720, 270], title: "", overview: `` }
  ],

  // stage 9
  [
    { pos: [720, 270], title: "", overview: `` }
  ],

  // stage 9
  [
    { pos: [720, 270], title: "", overview: `` }
  ]
]

const SKIL_DATA = [
  {
    tag: "cft",
    name_jp: "コンフォーマル・フューエル・タンク",
    explanation: "最大エネルギーチャージ量を30%向上させます。"
  },
  {
    tag: "supercruise",
    name_jp: "スーパークルーズ",
    explanation: "オーグメンター使用後のタイムラグを半減させます。"
  },
  {
    tag: "swingwing",
    name_jp: "可変翼",
    explanation: "オーグメンター持続時間が20%向上、アイテム効果を25%減少させます。"
  },
  {
    tag: "vtol",
    name_jp: "VTOL",
    explanation: "オーグメンター使用時、VTOLモードになります。"
  },
  {
    tag: "vt",
    name_jp: "推力偏向ノズル",
    explanation: "オーグメンター時の運動性能が40%向上、反応速度を50%向上させます。"
  },
  {
    tag: "asm",
    name_jp: "対艦番長",
    explanation: "対艦目標に対する攻撃力を40%向上させます。"
  },
  {
    tag: "armor",
    name_jp: "防弾装甲",
    explanation: "ダメージを20%減少させます。"
  },
  {
    tag: "maintain",
    name_jp: "現地整備",
    explanation: "アイテム効果を25%増加させます。"
  },
  {
    tag: "flare",
    name_jp: "追加フレアディスペンサ",
    explanation: "フレアの残弾を1つ増やします。"
  },
  {
    tag: "irst",
    name_jp: "IRST",
    explanation: "ステルス目標を探知できます。"
  },
  {
    tag: "stealth",
    name_jp: "ステルス",
    explanation: "自機の当たり判定を減少させます。"
  },
  {
    tag: "wso",
    name_jp: "兵装システム士官",
    explanation: "種別による攻撃力補正を10%向上させます。"
  },
  {
    tag: "fbl",
    name_jp: "フライ・バイ・ライト",
    explanation: "機体の反応速度を100%向上させます。"
  },
  {
    tag: "coin",
    name_jp: "COIN機",
    explanation: "スコア獲得量を10%増やします。"
  },
  {
    tag: "ucav",
    name_jp: "チーミング",
    explanation: "無人戦闘機が随伴します。"
  },
  {
    tag: "auto",
    name_jp: "オートパイロット",
    explanation: "衝突ダメージを減少させます。"
  },
  {
    tag: "reverser",
    name_jp: "スラストリバーサ",
    explanation: "後退する速度が上がります。"
  },
  {
    tag: "aesa",
    name_jp: "AESAレーダー",
    explanation: "レーダースキャン間隔を短くします。"
  },
  // {
  //   tag: "l_band",
  //   name_jp: "Lバンドレーダー",
  //   explanation: ""
  // }
];

// spec: [Speed, Reload, Power, Energy];
const WEAPON_DATA = [
  {
    tag: "m601",
    serial: "M601",
    name: "",
    name_jp: "",
    explanation: "",
    power: 20,
    reload: 4,
    en: 20
  },
  {
    tag: "eml12",
    serial: "EML-12C",
    name: "",
    name_jp: "",
    explanation: "レールガン",
    power: 50,
    reload: 10,
    en: 40
  },
  {
    tag: "l47",
    serial: "L-47",
    name: "",
    name_jp: "",
    explanation: "やや横に広がるレーザー",
    power: 15,
    reload: 6,
    en: 30
  },
  {
    tag: "m6",
    serial: "M6",
    name: "",
    name_jp: "",
    explanation: "火炎放射",
    power: 100,
    reload: 4,
    en: 30
  },
  {
    tag: "gs60",
    serial: "GS-60-3",
    name: "",
    name_jp: "",
    explanation: "斜めと後ろに撃つやつ",
    power: 40,
    reload: 6,
    en: 35
  },
  {
    tag: "l50",
    serial: "L-50",
    name: "",
    name_jp: "",
    explanation: "高速弾",
    power: 20,
    reload: 2,
    en: 15
  },
  {
    tag: "asraab",
    serial: "ASRAAB",
    name: "",
    name_jp: "",
    explanation: "3連装ショット",
    power: 45,
    reload: 15,
    en: 95
  },
  {
    tag: "pj234",
    serial: "PJ234",
    name: "",
    name_jp: "",
    explanation: "広範囲にばらまくクラスター弾",
    power: 0,
    reload: 2,
    en: 40
  },
  {
    tag: "type25",
    serial: "Type-25",
    name: "",
    name_jp: "",
    explanation: "爆発系ミサイル",
    power: 10,
    reload: 14,
    en: 60
  },
  {
    tag: "atm144",
    serial: "ATM-144D",
    name: "",
    name_jp: "",
    explanation: "マイクロミサイル(無誘導)",
    power: 50,
    reload: 5,
    en: 20
  },
  {
    tag: "kkh76",
    serial: "KKh-76",
    name: "",
    name_jp: "",
    explanation: "サイン波に合わせて動く弾",
    power: 30,
    reload: 4,
    en: 15
  },
  {
    tag: "malc",
    serial: "MALC",
    name: "",
    name_jp: "",
    explanation: "4連装で扇形にばらまく弾",
    power: 25,
    reload: 5,
    en: 35
  },
  {
    tag: "gua99",
    serial: "GUA-99",
    name: "",
    name_jp: "",
    explanation: "6連装で全て真正面に撃つ弾",
    power: 10,
    reload: 10,
    en: 40
  },
  {
    tag: "jdal",
    serial: "JDAL",
    name: "",
    name_jp: "",
    explanation: "2連装高威力キャノン",
    power: 65,
    reload: 16,
    en: 130
  },
  {
    tag: "hel",
    serial: "HLE Block2",
    name: "",
    name_jp: "",
    explanation: "高速レーザー",
    power: 10,
    reload: 1,
    en: 10
  },
  {
    tag: "r53",
    serial: "R.53",
    name: "",
    name_jp: "",
    explanation: "ショットガン",
    power: 10,
    reload: 8,
    en: 30
  },
  {
    tag: "ciasa",
    serial: "CIAS-A",
    name: "",
    name_jp: "",
    explanation: "広範囲にばらまく",
    power: 30,
    reload: 2,
    en: 15
  },
  {
    tag: "rb88",
    serial: "RB88",
    name: "",
    name_jp: "",
    explanation: "単発で特徴がないやつ",
    power: 5,
    reload: 6,
    en: 15
  },
  {
    tag: "tcc2",
    serial: "TCC-2",
    name: "",
    name_jp: "",
    explanation: "",
    power: 35,
    reload: 6,
    en: 30
  },
  {
    tag: "e_m601",
    serial: "M601",
    name: "",
    name_jp: "",
    explanation: "",
    power: 40
  },
  {
    tag: "e_eml12",
    serial: "EML-12",
    name: "",
    name_jp: "",
    explanation: "",
    power: 200
  }
];

const ENEMY_WEAPON_DATA = [
  {
    tag: "m601",
    img: "m601",
    power: 40,
    reload: 60,
    burst: 0,
    burst_reload: 0
  },
  {
    tag: "m601b",
    img: "m601",
    power: 5,
    reload: 60,
    burst: 6,
    burst_reload: 10
  }
]

// spec: [Speed, Defense, Charge];
const UNIT_DATA = [
  {
    tag: "fsb18",
    serial: "FS/B-18F",
    name: "CobraⅡ",
    name_jp: "コブラⅡ",
    explanation: "対空対地共に優れた汎用性の高いマルチロール戦闘機です。",
    type: "multirole",
    spec: [5, 5, 5],
    skil: ["cft", "auto"],
    weapon: "eml12",
    // weapon: "tcc2",
    specail_weapon: "l47",
    engine_pos: [2, 45]
  },
  {
    tag: "fi14",
    serial: "FI-14D",
    name: "MightyCat",
    name_jp: "マイティーキャット",
    explanation: "艦隊防空を主眼に置いた重武装の迎撃機です。",
    type: "interceptor",
    spec: [4, 6, 10],
    skil: ["swingwing", "irst", "wso"],
    weapon: "type25",
    specail_weapon: "jdal",
    engine_pos: [5, 45],
    wing_pos: 11
  },
  {
    tag: "b15",
    serial: "B-15E",
    name: "Strike",
    name_jp: "ストライク",
    explanation: "FS-15制空戦闘機を元に開発された生存性の高い爆撃機です。",
    type: "bomber",
    spec: [3, 10, 6],
    skil: ["cft", "flare", "wso"],
    weapon: "m6",
    specail_weapon: "pj234",
    engine_pos: [3, 43]
  },
  {
    tag: "xfs23",
    serial: "FS-23A",
    name: "Rapier",
    name_jp: "レイピア",
    explanation: "ステルス性や超音速巡航性能などの最新機能を備えた高性能戦闘機です。",
    type: "fighter",
    spec: [9, 2, 5],
    skil: ["supercruise", "vt", "stealth", "aesa"],
    weapon: "l50",
    specail_weapon: "l47",
    engine_pos: [4, 42]
  },
  {
    tag: "xb44",
    serial: "XB-44A",
    name: "Sentinel",
    name_jp: "センチネル(監視者)",
    explanation: "高いステルス性と搭載量を備えた新型戦闘爆撃機です。",
    type: "bomber",
    spec: [4, 8, 8],
    skil: ["supercruise", "vt", "irst","stealth", "fbl", "auto", "aesa"],
    weapon: "hel",
    specail_weapon: "atm144",
    engine_pos: [3, 45]
  },
  {
    tag: "sy25",
    serial: "SY-25TM",
    name: "Volk",
    name_jp: "ヴォルク(ロシア語で狼)",
    explanation: "対地攻撃力が優秀な攻撃機です。",
    type: "attacker",
    spec: [2, 7, 7],
    skil: ["armor", "maintain", "flare"],
    weapon: "m601",
    specail_weapon: "asraab",
    engine_pos: [3, 30]
  },
  {
    tag: "sy30sm",
    serial: "SY-30SM",
    name: "Babochka",
    name_jp: "バーバチカ(ロシア語で蝶)",
    explanation: "高水準の運動性能と耐久性能を持つ強力な戦闘機です。",
    type: "fighter",
    spec: [10, 5, 4],
    skil: ["supercruise", "vt", "irst", "wso", "auto"],
    weapon: "eml12",
    specail_weapon: "r53",
    engine_pos: [3, 43]
  },
  {
    tag: "yig144",
    serial: "YIG-144S",
    name: "Avrora",
    name_jp: "アヴローラ(ロシア語でオーロラ)",
    explanation: "ステルス性はないが、全体的に高水準な最新鋭の制空戦闘機です。",
    type: "fighter",
    spec: [6, 6, 6],
    skil: ["cft", "supercruise", "vt", "irst", "auto", "aesa"],
    weapon: "malc",
    specail_weapon: "l50",
    engine_pos: [3, 43]
  },
  {
    tag: "va8",
    serial: "VA-8GR",
    name: "SuperKestrel",
    name_jp: "スーパーケストレル",
    explanation: "珍しい垂直離着陸能力を持つ攻撃機です。",
    type: "attacker",
    spec: [1, 4, 10],
    skil: ["vtol", "armor", "maintain", "flare", "irst"],
    weapon: "kkh76",
    specail_weapon: "jdal",
    engine_pos: [2, 27]
  },
  {
    tag: "isd",
    serial: "ISD-4GR",
    name: "SpruhRegen",
    name_jp: "シュプリューレーゲン(ドイツ語で霧雨)",
    explanation: "可変翼を備え、高い攻撃力を備えた重武装爆撃機です。",
    type: "bomber",
    spec: [2, 6, 8],
    skil: ["swingwing", "flare", "wso", "reverser"],
    weapon: "tcc2",
    specail_weapon: "pj234",
    engine_pos: [2, 44],
    wing_pos: 8
  },
  {
    tag: "md4000",
    serial: "MD.4000M",
    name: "Azur",
    name_jp: "アズュール(フランス語で紺碧)",
    explanation: "特徴的な装備はないですが、総合スペックの高いマルチロール戦闘機です。",
    type: "multirole",
    spec: [6, 3, 6],
    skil: ["supercruise", "aesa"],
    weapon: "gua99",
    specail_weapon: "malc",
    engine_pos: [2, 45]
  },
  {
    tag: "al159",
    serial: "AL-159",
    name: "Luna",
    name_jp: "ルナ(チェコ語で月)",
    explanation: "癖はないですが、攻撃力が低く実戦には向かない練習機です。",
    type: "trainer",
    spec: [2, 2, 2],
    skil: ["maintain", "coin"],
    weapon: "m601",
    specail_weapon: "gs60",
    engine_pos: [2, 38]
  },
  {
    tag: "saas39",
    serial: "SAAS-39NG",
    name: "Frihet",
    name_jp: "フリヘット(スウェーデン語で自由)",
    explanation: "高い運動性能と信頼性がウリの軽量級戦闘機です。",
    type: "interceptor",
    spec: [8, 1, 5],
    skil: ["supercruise", "maintain", "auto", "reverser"],
    weapon: "l50",
    specail_weapon: "asraab",
    engine_pos: [0, 47]
  },
  {
    tag: "ab2",
    serial: "AB2M1",
    name: "Ryoufuu",
    name_jp: "涼風",
    explanation: "対艦攻撃も想定され開発された高い攻撃力を持つ攻撃機です。",
    type: "attacker",
    spec: [7, 3, 6],
    skil: ["asm", "fbl", "aesa"],
    weapon: "gua99",
    specail_weapon: "type25",
    engine_pos: [2, 45]
  },
  {
    tag: "jin20",
    serial: "JIN-20B",
    name: "Wushi",
    name_jp: "ウーシー(巫師,中国語で魔術師)",
    explanation: "ステルスを持ち、継戦能力に特化した大型戦闘機です。",
    type: "interceptor",
    spec: [3, 8, 4],
    skil: ["cft", "irst", "stealth", "wso", "aesa"],
    weapon: "m6",
    specail_weapon: "atm144",
    engine_pos: [2, 45]
  },
  {
    tag: "kat50",
    serial: "KAT-50A",
    name: "Saja",
    name_jp: "サジャ(獅子,韓国語でライオン)",
    explanation: "優秀な火力を持ち、実践でも活躍できる練習機です。",
    type: "trainer",
    spec: [4, 1, 4],
    skil: [],
    weapon: "l47",
    specail_weapon: "gs60",
    engine_pos: [0, 47]
  },
  {// TFX
    tag: "tf24",
    serial: "MMU-TF-24",
    name: "Kral",
    name_jp: "クラル(トルコ語で王)",
    explanation: "無人機との連携を前提に開発された試作戦闘機です。",
    type: "multirole",
    spec: [6, 6, 3],
    skil: ["stealth", "ucav"],
    weapon: "malc",
    specail_weapon: "asraab",
    engine_pos: [2, 41]
  },
  {// SAIA 90
    tag: "sai90",
    serial: "SAI-90",
    name: "Escudo",
    name_jp: "エスクード(スペイン語で盾)",
    explanation: "ステルス性を備えた軽戦闘機です。",
    type: "trainer",
    spec: [5, 4, 1],
    skil: ["stealth"],
    weapon: "tcc2",
    specail_weapon: "ciasa",
    engine_pos: [2, 47]
  },
  // {
  //   tag: "fi22n",
  //   serial: "FI-22N",
  //   name: "SilentCat",
  //   name_jp: "サイレントキャット",
  //   explanation: "可変翼を備え、高い運動性能と速度性能を兼ね備えた試作ステルス戦闘機です。",
  //   type: "prototype",
  //   spec: [0, 0, 0],
  //   skil: ["stealth"],
  //   weapon: "",
  //   specail_weapon: "",
  //   engine_pos: [0, 0]
  // },
  // {
  //   tag: "s47km",
  //   serial: "S-47KM",
  //   name: "",
  //   name_jp: "",
  //   explanation: "前進翼で安定性を犠牲に機動性を極限まで突き詰めたハイエンド戦闘機です。",
  //   type: "prototype",
  //   spec: [0, 0, 0],
  //   skil: [""],
  //   weapon: "",
  //   specail_weapon: "",
  //   engine_pos: [0, 0]
  // },
  // {
  //   tag: "ab3",
  //   serial: "AB3G1",
  //   name: "Meteor",
  //   name_jp: "ミーティア",
  //   explanation: "最新技術を惜しげもなく投入し開発された次世代戦闘機です。",
  //   type: "prototype",
  //   spec: [8, 7, 10],
  //   skil: ["stealth"],
  //   weapon: "",
  //   specail_weapon: "",
  //   engine_pos: [0, 0]
  // }
];
// 追加候補
// fighter: MiG-1.44
// interceptor: JAS 39
// bomber: X-44
// bomber: Tornado IDS
// trainer: T-50
// trainer: SAIA 90

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
    tag: "iac1",
    serial: "IA-C1",
    name_jp: "ネッツ(ヘブライ語で鷹)",
    importance: "nomal",
    attribute: "air",
    hp: 150,
    score: 100,
    parts: [ ],
    weapon: "m601"
  },
  {
    tag: "yig21",
    serial: "YIG-21",
    name_jp: "ストレーラ(ロシア語で矢)",
    importance: "nomal",
    attribute: "air",
    hp: 90,
    score: 100,
    parts: [ ]
  },
  {
    tag: "ea314",
    serial: "E-A314",
    name_jp: "スーパーパルダウ(ポルトガル語でスーパー雀)",
    importance: "nomal",
    attribute: "air",
    hp: 250,
    score: 100,
    stealth: false,
    parts: [ "ea314_propeller" ]
  },
  {
    tag: "fs16",
    serial: "FS-16CG",
    name_jp: "マスタングⅡ",
    importance: "nomal",
    attribute: "air",
    hp: 250,
    score: 100,
    stealth: false,
    parts: [ "ea314_propeller" ]
  },
  {
    tag: "fs35",
    serial: "FS-35C",
    name_jp: "",
    importance: "nomal",
    attribute: "air",
    stealth: true,
    parts: [ ]
  },
  {
    tag: "yig29",
    serial: "YIG-29S",
    name_jp: "",
    importance: "nomal",
    attribute: "air",
    hp: 160,
    score: 100,
    stealth: false,
    parts: [ ],
    weapon: "m601b"
  },
  {
    tag: "yig35",
    serial: "YIG-35",
    name_jp: "",
    importance: "nomal",
    attribute: "air",
    stealth: false,
    parts: [ ]
  },
  {
    tag: "me300",      // HA 300
    serial: "Me-300",
    name_jp: "",
    importance: "nomal",
    attribute: "air",
    stealth: false,
    parts: [ ]
  },
  {
    tag: "shab",      // HESA Saeqeh
    serial: "Shab",
    name_jp: "",
    importance: "nomal",
    attribute: "air",
    stealth: false,
    parts: [ ]
  },
  {
    tag: "m543",      // M-345
    serial: "M-543",
    name_jp: "",
    importance: "nomal",
    attribute: "air",
    stealth: false,
    parts: [ ]
  },
  {
    tag: "ck1",      // F-CK-1
    serial: "CK-1",
    name_jp: "",
    importance: "nomal",
    attribute: "air",
    stealth: false,
    parts: [ ]
  },

  {
    tag: "turbulence",      // Halifax
    serial: "Turbulence C.VII",
    name_jp: "",
    importance: "boss",
    attribute: "air",
    hp: 2400,
    score: 2000,
    stealth: false,
    parts: [ "turbulence_propeller", "turbulence_gun", "turbulence_gun" ],
    weapon: "none"
  }
];
