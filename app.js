/* ============ Gare de Lyon · 分屏单步流程 ============ */
/* 画面屏（看/听）+ 任务屏（一次一件事）。两种屏全尺寸、从不一同出现，靠底部「下一步 ▸」翻页。零依赖。 */

/* ---------------- 语料（docs/01-corpus-francais.md v3） ---------------- */
var TURNS = [
  {
    title:'第 1 段 · 发现取消', goal:'礼貌开口 · vous · je voudrais',
    predict:'她的车没了。走向窗口前，<b>在心里说出她的第一句</b> —— 想好了就继续。',
    bg:{ predict:'hall', reveal:'guichet' },
    options:[
      { key:'A', tag:'说清楚了', id:'T1-A-L',
        fr:'Bonjour, je voudrais un renseignement. Le train de 14 h 20 pour Chamonix est supprimé ?',
        zh:'您好，我想咨询一下。14 点 20 去沙莫尼的车是取消了吗？',
        targets:['je voudrais'], why:'vous + conditionnel，还说清了要什么信息' },
      { key:'B', tag:'话说太少', id:'T1-B-L',
        fr:'Excusez-moi, mon train est annulé.',
        zh:'打扰一下，我的车取消了。',
        targets:['mon train est annulé'], why:'vous 到位，但没问出具体问题' }
    ],
    replies:{
      A:{ id:'T1-A-R', fr:'Oui, madame. Il y a un incident technique sur la ligne. Je peux vous proposer le train suivant.',
          zh:'是的，女士。线路上发生了技术故障。我可以帮您安排下一班车。', targets:['un incident technique'] },
      B:{ id:'T1-B-R', fr:'Oui. Incident technique.', zh:'是的。技术故障。 —— 就这一句。', targets:['incident technique'] }
    },
    sprite:{ predict:'thinking', A:'worried', B:'worried' }
  },
  {
    title:'第 2 段 · 提出改签', goal:'il faut que + subjonctif · conditionnel 委婉',
    predict:'窗口里的人说「可以安排下一班车」。Camille 想改签，还想让他知道<b>今晚必须到沙莫尼</b>。<br><b>她会怎么开口？</b>先说出声。',
    bg:{ predict:'guichet', reveal:'guichet' },
    options:[
      { key:'A', tag:'委婉有力', id:'T2-A-L',
        fr:'Il faut que je sois à Chamonix ce soir. Est-ce qu\'il serait possible d\'échanger mon billet ?',
        zh:'我今晚必须到沙莫尼。可以给我换票吗？',
        targets:['Il faut que je sois'], why:'subjonctif + conditionnel，急迫与礼貌都在' },
      { key:'B', tag:'直了点', id:'T2-B-L',
        fr:'Je dois aller à Chamonix ce soir. Vous pouvez changer mon billet ?',
        zh:'我今晚得去沙莫尼。您能帮我换票吗？',
        targets:['Je dois'], why:'vous 到位，但 pouvez 不够委婉' }
    ],
    replies:{
      A:{ id:'T2-A-R', fr:'Bien sûr. Il y a un train à 15 h 05, avec une correspondance à Saint-Gervais. Vous arriverez à 21 h 10.',
          zh:'当然可以。15 点 05 有一班车，在圣热尔韦换乘，您 21 点 10 到达。', targets:['une correspondance'] },
      B:{ id:'T2-B-R', fr:'Oui. 15 h 05.', zh:'可以。15 点 05。 —— 只给了时间。', targets:[] }
    },
    sprite:{ predict:'thinking', A:'asking', B:'asking' }
  },
  {
    title:'第 3 段 · 确认细节', goal:'疑问句 · une correspondance · un supplément',
    predict:'拿到了 15 h 05 这个时间。上车之前还得确认什么？<br><b>把你要问的句子先说出声。</b>',
    bg:{ predict:'guichet', reveal:'guichet' },
    options:[
      { key:'A', tag:'一次问全', id:'T3-A-L',
        fr:'Il part de quel quai ? Et est-ce qu\'il y a une correspondance ?',
        zh:'从几号站台发车？需要换乘吗？',
        targets:['quel quai'], why:'两个完整疑问句 —— 对方也会一次答全' },
      { key:'B', tag:'只问一项', id:'T3-B-L',
        fr:'C\'est quel quai ?',
        zh:'是几号站台？',
        targets:['quel quai'], why:'只问了站台，换乘和差价还没落实' }
    ],
    replies:{
      A:{ id:'T3-A-R', fr:'Quai 7. Oui, vous changez à Saint-Gervais. Et aucun supplément : votre billet reste valable.',
          zh:'7 号站台。是的，您在圣热尔韦换车。而且没有差价：您的票依然有效。', targets:['reste valable'] },
      B:{ id:'T3-B-R', fr:'Quai 7.', zh:'7 号站台。 —— 只答了站台。', targets:[] }
    },
    followup:{
      learner:{ id:'T3-F-L', fr:'Et je dois changer de train ? Je dois payer un supplément ?',
                zh:'那我需要换车吗？要补差价吗？', targets:['un supplément'] },
      agent:{ id:'T3-F-R', fr:'Oui, vous changez à Saint-Gervais. Mais non, aucun supplément.',
              zh:'是的，您在圣热尔韦换车。不过不用补差价。', targets:['Saint-Gervais'] }
    },
    sprite:{ predict:'thinking', A:'asking', B:'unsure' }
  },
  {
    title:'第 4 段 · 复述确认', goal:'确认关键信息 · 礼貌告别',
    predict:'信息都拿到了。法国人离开窗口前会把关键信息<b>复述一遍确认</b> —— <br><b>你会怎么说？</b>',
    bg:{ predict:'guichet', reveal:'guichet' },
    options:[
      { key:'A', tag:'完整确认', id:'T4-A-L',
        fr:'Donc, le train de 15 h 05, quai 7, avec une correspondance à Saint-Gervais, sans supplément. Merci beaucoup, bonne journée.',
        zh:'那么，15 点 05 的车，7 号站台，在圣热尔韦换乘，不用补差价。非常感谢，日安。',
        targets:['Donc'], why:'说错了他还能当场纠正你' },
      { key:'B', tag:'确认一半', id:'T4-B-L',
        fr:'D\'accord, 15 h 05, quai 7. Merci.',
        zh:'好的，15 点 05，7 号站台。谢谢。',
        targets:['quai 7'], why:'换乘没确认，告别语也省了' }
    ],
    replies:{
      A:{ id:'T4-A-R', fr:'Je vous en prie, madame. Bon voyage !', zh:'不客气，女士。旅途愉快！', targets:['Bon voyage'] },
      B:{ id:'T4-B-R', fr:'Bon voyage, madame.', zh:'旅途愉快，女士。', targets:[] }
    },
    sprite:{ predict:'thinking', A:'relieved', B:'relieved' }
  }
];

var SPRITES = {
  neutral:'assets/img/camille-neutral.png', worried:'assets/img/camille-worried.png',
  asking :'assets/img/camille-asking.png',  unsure :'assets/img/camille-unsure.png',
  relieved:'assets/img/camille-relieved.png', thinking:'assets/img/camille-thinking.png'
};

var LEVELS = [
  { n:1, eyebrow:'最后一关 · L1 · 还能回看', title:'先凭记忆再说一遍', tip:'要不再听一遍？听完请<b>合上句子</b>再说 —— 照读不算。' },
  { n:2, eyebrow:'最后一关 · L2 · 只剩关键词', title:'看着词把它串起来', tip:'词是脚手架，不是句子。用 <i>d\'abord / ensuite / heureusement / finalement</i> 串起来。' },
  { n:3, eyebrow:'最后一关 · L3 · 只剩句框', title:'首字母自己填', tip:'卡住的地方，就是你还没真正掌握的地方 —— 记住它。' },
  { n:4, eyebrow:'最后一关 · L4 · 只剩这张图', title:'现在开始讲', tip:'提示全撤了。这就是考试里真正的样子：什么都没有，只有你和这件事。' }
];

/* ---------------- 铺垫（可理解性输入 i+1）：词 → 句式 → 整句 ----------------
   画面与文字必须同屏：词卡弹出时它指称的东西就在画面上。
   hot:[x,y] 是 #hero 内的百分比坐标（与 .anchor 同一坐标系；全屏 cover 裁切下以实机微调为准）。
   gender: m=阳性(蓝) f=阴性(粉) adj=形容词双形 v=动词 phr=短语 —— 语料事实，不造词。 */
var LEADIN_WORDS = [
  { id:'W-SUPPRIME',        fr:'supprimé',              forms:'supprimé / supprimée', gender:'adj', hot:[69,26], zh:'被取消的', img:'assets/img/word-supprime.png' },
  { id:'W-INCIDENT',        fr:'un incident technique', gender:'m',   hot:[76,34], zh:'技术故障', img:'assets/img/word-incident.png' },
  { id:'W-RENSEIGNEMENT',   fr:'un renseignement',      gender:'m',   hot:[54,40], zh:'一条信息 / 咨询', img:'assets/img/word-renseignement.png' },
  { id:'W-GUICHET',         fr:'un guichet',            gender:'m',   hot:[48,50], zh:'售票窗口', img:'assets/img/word-guichet.png' },
  { id:'W-ECHANGER',        fr:'échanger un billet',    gender:'v',   hot:[20,62], zh:'换一张票', img:'assets/img/word-echanger.png' },
  { id:'W-SUPPLEMENT',      fr:'un supplément',         gender:'m',   hot:[58,58], zh:'补差价', img:'assets/img/word-supplement.png' },
  { id:'W-CORRESPONDANCE',  fr:'une correspondance',    gender:'f',   hot:[63,20], zh:'换乘 / 联程', img:'assets/img/word-correspondance.png' },
  { id:'W-SANS-SUPPLEMENT', fr:'sans supplément',       gender:'phr', hot:[28,70], zh:'不用补差价', img:'assets/img/word-sans-supplement.png' }
];
var GENDER = {
  m:  { tag:'阳性 · un / le',    cls:'g-m' },
  f:  { tag:'阴性 · une / la',   cls:'g-f' },
  adj:{ tag:'形容词 · 随性别变形', cls:'g-a' },
  v:  { tag:'动词 · 不定式',      cls:'g-v' },
  phr:{ tag:'短语',              cls:'g-p' }
};
var PATTERN = {
  title:'开口第一句 · 句式',
  parts:[
    { fr:'Je voudrais',                zh:'我想要 —— vous + 条件式，最礼貌的开场', sig:true },
    { fr:'un billet',                  zh:'un / une + 名词，阴阳要配对', sig:false },
    { fr:'pour Chamonix, s\'il vous plaît.', zh:'pour + 目的地；s\'il vous plaît 礼貌收尾', sig:false }
  ],
  full:'Je voudrais un billet pour Chamonix, s\'il vous plaît.',
  audio:'T1-A-PAT'
};
/* 挖空：R-MODEL 范文挖 7 空（B1 目标词），+ 2 个干扰词进词池。alt=可接受的变形 */
var GAPS = [
  { key:'supprimé',           alt:['supprimée'], audio:'W-SUPPRIME',        zh:'被取消的' },
  { key:'guichet',            alt:[],            audio:'W-GUICHET',         zh:'售票窗口' },
  { key:'renseignement',      alt:[],            audio:'W-RENSEIGNEMENT',   zh:'信息 / 咨询' },
  { key:'incident technique', alt:[],            audio:'W-INCIDENT',        zh:'技术故障' },
  { key:'échanger',           alt:[],            audio:'W-ECHANGER',        zh:'换（票）' },
  { key:'correspondance',     alt:[],            audio:'W-CORRESPONDANCE',  zh:'换乘 / 联程' },
  { key:'supplément',         alt:[],            audio:'W-SUPPLEMENT',      zh:'补差价' }
];
var GAP_DISTRACTORS = ['annulé', 'billet'];
var ECHO_LINES = ['T1-A-L', 'T2-A-L', 'T3-A-L', 'T4-A-L'];   // echo 听录句：四段 Camille 的完整句

/* ---------------- 工具 ---------------- */
function $(s){ return document.querySelector(s); }
function $$(s){ return [].slice.call(document.querySelectorAll(s)); }

/* ---------------- 画面层 ---------------- */
var imgA = $('#imgA'), imgB = $('#imgB'), flop = true;
Object.keys(SPRITES).forEach(function(k){ var i = new Image(); i.src = SPRITES[k]; });
function setSprite(key){
  var s = flop ? imgA : imgB, h = flop ? imgB : imgA;
  s.src = SPRITES[key] || SPRITES.neutral;
  if (s.complete) go(); else s.onload = go;
  function go(){ s.classList.add('show'); h.classList.remove('show'); }
  flop = !flop;
}
function setBg(name){
  $$('#hero .bg').forEach(function(b){ b.classList.toggle('show', b.dataset.bg === name); });
  var w = $('#stage-word'); if (w && w.dataset.state !== 'REMOVE') w.classList.toggle('hidden', name !== 'hall');
}
/* showHero(true)=画面屏；showHero(false)=任务屏。两块从不一同出现 */
function showHero(on){
  document.body.classList.toggle('show-scene', on);
  document.body.classList.toggle('show-task', !on);
}

/* ---------------- 音频：mp3 + 词级时间轴，失败回退 TTS ---------------- */
var audio = null, raf = null, slow = false, cache = {}, lastLine = null;

/* ---------------- 音频解锁 + 失败可见 ----------------
   浏览器会拦「不在用户手势里发生的 play()」。原先的 .catch(function(){}) 把失败
   静默吞掉了 —— 页面照常往下走，但一点声音也没有，也没有任何提示（用户反馈「我听不到音频」）。
   这里三层保险：① 首次任意点击即解锁并预热；② 失败必须可见；③ 给一个能立刻自查的入口。 */
var AC = null, audioBlocked = 0, unlocked = false;
var AUD = null;                       // 全局单例：全站只用一个 <audio>，避免多个元素抢音频通道
function getAudio(){
  if (!AUD){ AUD = new Audio(); AUD.preload = 'auto'; AUD.volume = 1; }
  return AUD;
}
function unlockAudio(){
  if (unlocked) return;               // 只做一次 —— 少了这句，每次点击都会新建 audio 去播放，反过来挤掉真正要听的那一路
  unlocked = true;
  document.removeEventListener('click', unlockAudio, true);
  document.removeEventListener('touchstart', unlockAudio, true);
  document.removeEventListener('keydown', unlockAudio, true);
  try{
    if (window.AudioContext || window.webkitAudioContext){
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      if (AC.state === 'suspended') AC.resume();
    }
  }catch(e){}
  try{
    // 复用单例，静音播一次 TEST.mp3 换取「已被用户激活」的资格（这个文件用户已验证能出声）
    var a = getAudio();
    a.volume = 0; a.src = 'assets/audio/TEST.mp3';
    var fin = function(){ try{ a.pause(); a.currentTime = 0; }catch(e){} a.volume = 1; };
    var p = a.play();
    if (p && p.then) p.then(fin).catch(fin); else setTimeout(fin, 400);
  }catch(e){}
}
// capture 阶段：跑在任何按钮自身逻辑之前，保证第一次点击就把音频通路打开
document.addEventListener('click', unlockAudio, true);
document.addEventListener('touchstart', unlockAudio, true);
document.addEventListener('keydown', unlockAudio, true);

function note(msg, warn){
  var el = $('#audio-note'); if (!el) return;
  if (!msg){ el.classList.add('hidden'); el.textContent = ''; return; }
  el.classList.remove('hidden'); el.textContent = msg;
}
function playBtn(on, label){
  var pb = $('#play-btn'); if (!pb) return;
  pb.classList.toggle('hidden', !on);
  if (label) pb.textContent = label;
}
function audioBlockedFail(why){
  audioBlocked++;
  $('#eq').classList.remove('on');
  playBtn(true, '▶ 点这里才有声音');
  note(why + ' —— 点上面的按钮就能出声。（若仍无声：检查系统音量、浏览器标签页是否被静音、是否戴了蓝牙耳机）', true);
}
function suf(){ return slow ? '__slow' : ''; }
function fetchWords(id){
  var u = 'assets/audio/' + id + suf() + '.words.json';
  if (!cache[u]) cache[u] = fetch(u).then(function(r){ return r.ok ? r.json() : null; }).catch(function(){ return null; });
  return cache[u];
}
function renderKara(el, words, targets, anchor){
  el.innerHTML = '';
  var spans = words.map(function(w){
    var s = document.createElement('span');
    s.className = 'w'; s.textContent = w.w + ' ';
    el.appendChild(s); return s;
  });
  var norm = function(x){ return String(x).toLowerCase().replace(/[’']/g, "'").replace(/[^a-zà-ÿ' ]/gi, '').trim(); };
  (targets || []).forEach(function(t){
    var tn = norm(t).split(/\s+/);
    for (var i = 0; i + tn.length <= words.length; i++){
      var ok = true;
      for (var j = 0; j < tn.length; j++){ if (norm(words[i + j].w) !== tn[j]){ ok = false; break; } }
      if (ok){ for (var k = 0; k < tn.length; k++){ spans[i + k].classList.add('target'); spans[i + k].dataset.anchor = anchor; } break; }
    }
  });
  return spans;
}
function stopAudio(){
  if (audio){ try{ audio.pause(); }catch(e){} audio = null; }
  try{ if (AUD) AUD.pause(); }catch(e){}   // 单例也要停，否则残留的静音预热会占着通道
  if (raf) cancelAnimationFrame(raf);
  $('#eq').classList.remove('on');
}

function playLine(o, anchor){
  stopAudio();
  lastLine = o;
  $('#speaker').textContent = o.name; $('#speaker').className = o.cls;
  $('#zh').classList.add('hidden'); $('#zh-btn').textContent = '中文释义（先猜）';
  $('#fr').innerHTML = '<span class="guide">…</span>';
  return fetchWords(o.id).then(function(words){
    var list = (words && words.words) ? words.words : null;   // fetchWords 返回整份 JSON，词级数组在 .words 里
    if (o.zh) $('#zh').textContent = o.zh;
    if (!list){
      /* 拿不到词级时间轴 —— 最常见的原因就是双击 index.html 用 file:// 打开，此时 fetch 会被拦。
         但 <audio src> 不受 fetch 限制，所以仍然直接播 mp3，只是没有逐词高亮。
         旧代码这里只调 tts()，而 Windows 常常没有法语嗓音，结果就是彻底无声。 */
      $('#fr').textContent = o.fr;
      audio = getAudio();
      audio.src = 'assets/audio/' + o.id + suf() + '.mp3';
      audio.volume = 1;
      audio.onerror = function(){ note('这段音频没能加载出来。', true); tts(o.fr); };
      var pa = audio.play();
      if (pa && pa.then){
        pa.then(function(){ $('#eq').classList.add('on'); playBtn(false); note(''); })
          .catch(function(){ audioBlockedFail('这一段没能播出来'); tts(o.fr); });
      }
      return audio;
    }
    var spans = renderKara($('#fr'), list, o.targets, anchor || 'window');
    audio = getAudio();                       // 复用单例，不再每次 new 一个
    audio.src = 'assets/audio/' + o.id + suf() + '.mp3';
    audio.volume = 1;
    audio.onerror = function(){
      $('#fr').textContent = o.fr;
      note('这段 mp3 没能加载出来，已改用浏览器自带语音朗读（音色会差一些）。', true);
      tts(o.fr);
    };
    audio.play().then(function(){
      $('#eq').classList.add('on'); playBtn(false); note('');
    }).catch(function(e){
      if (!audio) return;
      var why = (e && e.name === 'NotAllowedError')
        ? '浏览器的自动播放保护拦住了这一次'
        : '这一段没能播出来';
      audioBlockedFail(why);
    });
    // 兜底：如果 2.5 秒过去了 currentTime 还是 0，说明压根没出声
    (function(){
      var a0 = audio, t0 = Date.now();
      (function chk(){
        if (a0 !== audio) return;
        if (!audio) return;
        if (audio.paused || audio.ended || audio.currentTime > 0.15){
          if (!audio.paused || audio.currentTime > 0.15) { playBtn(false); note(''); }
          return;
        }
        if (Date.now() - t0 > 2500 && audioBlocked >= 0 && audio.paused){ audioBlockedFail('这一段没能自动播出'); return; }
        setTimeout(chk, 200);
      })();
    })();
    var idx = -1;
    (function tick(){
      if (!audio) return;
      var t = audio.currentTime, hit = -1;
      for (var k = 0; k < list.length; k++){
        if (t >= list[k].s && t < list[k].s + list[k].d){ hit = k; break; }
        if (t >= list[k].s) hit = k;
      }
      if (hit !== idx){
        if (spans[idx]) spans[idx].classList.remove('hit');
        if (spans[hit]) spans[hit].classList.add('hit');
        idx = hit;
      }
      if (!audio.ended) raf = requestAnimationFrame(tick); else $('#eq').classList.remove('on');
    })();
    return audio;
  });
}
function playSeq(list, onDone){
  var p = Promise.resolve();
  list.forEach(function(o){
    p = p.then(function(){
      return new Promise(function(res){
        playLine(o, o.anchor);
        var t0 = Date.now();
        (function wait(){
          if (audio){ audio.onended = res; return; }
          if (Date.now() - t0 > 6000) return res();   // TTS 兜底时不卡住流程
          setTimeout(wait, 150);
        })();
      });
    });
  });
  return p.then(function(){ if (onDone) onDone(); });
}
function tts(text){
  try{
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'fr-FR'; u.rate = slow ? .75 : .9;
    speechSynthesis.speak(u);
  }catch(e){}
}

/* ---------------- 卡片层：一次一件事 ---------------- */
var S = { scene:'intro', turn:0, phase:'see', picked:null, level:1, prod:0, leadin:0, wordsSeen:[], gapDone:[], gapActive:null, echoIdx:0 };
var visited = [];

function act(label, primary, onClick, disabled){
  return { label:label, primary:primary, onClick:onClick, disabled:disabled };
}
function card(o){
  $('#card-eyebrow').textContent = o.eyebrow || '';
  $('#card-title').innerHTML    = o.title || '';
  $('#card-text').innerHTML     = o.text  || '';
  $('#card-tip').innerHTML      = o.tip   || '';
  var body = $('#card-body');
  try{ var oldA = body.querySelector('audio'); if (oldA) oldA.pause(); }catch(e){}  // 别让上一步的自检播放器变成幽灵
  body.innerHTML = '';
  if (o.body) body.appendChild(o.body);
  var acts = $('#card-actions'); acts.innerHTML = '';
  (o.actions || []).forEach(function(a){
    var b = document.createElement('button');
    b.className = 'act ' + (a.primary ? 'primary' : 'ghost');
    b.innerHTML = a.label;
    b.disabled = !!a.disabled;
    b.onclick = a.onClick;
    acts.appendChild(b);
  });
}
/* 翻页按钮：label 为空则隐藏（用于有显式卡片按钮的页，如开场/收尾） */
function setNav(label, fn, disabled){
  var b = $('#nav-btn'), nav = $('#nav');
  if (!label){ nav.classList.add('hidden'); return; }
  nav.classList.remove('hidden');
  b.textContent = label; b.disabled = !!disabled; b.onclick = fn;
}
/* 听层复位：停掉音频，显示一句提示（无声音的步骤用） */
function clearSub(txt){
  stopAudio();
  $('#fr').innerHTML = '<span class="guide">' + (txt || '（这一步没有声音）') + '</span>';
  $('#zh').classList.add('hidden'); $('#zh-btn').textContent = '中文释义（先猜）';
  playBtn(false); note('');
}
function stepLabel(t){ $('#step-label').textContent = t; }

/* ---------------- 四动作徽章：每一步显性标注「这一步在训练什么」 ----------------
   SEGMENT 切段=一次只推一段 · SIGNAL 突出=重点标金 · REMOVE 删除=撤掉辅助 · FADE 撤梯=一层层撤提示 */
var BADGES = [
  { key:'seg',  txt:'SEGMENT · 切段', cls:'b-seg'  },
  { key:'sig',  txt:'SIGNAL · 突出',  cls:'b-sig'  },
  { key:'rem',  txt:'REMOVE · 删除',  cls:'b-rem'  },
  { key:'fade', txt:'FADE · 撤梯',    cls:'b-fade' }
];
function setBadge(keys){
  var label = $('#step-label');
  var host = $('#step-badges');
  if (!host){
    host = document.createElement('span'); host.id = 'step-badges';
    label.parentNode.insertBefore(host, label.nextSibling);
  }
  host.innerHTML = '';
  (keys || []).forEach(function(k){
    var b = BADGES.filter(function(x){ return x.key === k; })[0];
    if (!b) return;
    var s = document.createElement('span');
    s.className = 'badge ' + b.cls; s.textContent = b.txt;
    host.appendChild(s);
  });
}

function render(){
  if (S.scene !== 'leadin') hideLeadin();   // 铺垫层（热点/词卡/句式卡）只在 leadin 场景存活
  if (S.scene === 'intro')      return renderIntro();
  if (S.scene === 'situation')  return renderSituation();
  if (S.scene === 'leadin')     return renderLeadin();
  if (S.scene === 'turns')      return renderTurn();
  if (S.scene === 'gaps')       return renderGaps();
  if (S.scene === 'echo')       return renderEcho();
  if (S.scene === 'retell')     return renderRetell();
  if (S.scene === 'done')       return renderDone();
}

/* --- 音频自检：用浏览器原生播放器，一次分清是谁的问题 --- */
function testSound(){
  stopAudio();
  var box = document.createElement('div');
  box.innerHTML =
    '<audio controls preload="auto" src="assets/audio/TEST.mp3"></audio>' +
    '<p class="diag">这是浏览器<b>自带</b>的播放器，点 ▶ 试试：<br>' +
    '<b>这里有声</b> → 你的电脑、耳机、音频文件都正常。<br>' +
    '<b>这里也没声</b> → 与本页面无关：查一下系统音量、浏览器标签页是不是被静音了、蓝牙耳机连没连上。</p>';
  $('#card-body').appendChild(box);
  var a = box.querySelector('audio');
  try{
    a.volume = 1; a.currentTime = 0;
    var p = a.play(); if (p && p.catch) p.catch(function(){});
  }catch(e){}
}

/* --- 开场（任务屏） --- */
function renderIntro(){
  stepLabel('开始之前'); showHero(false); clearSub('（开场没有声音，但你可以先试一下音箱）');
  setBadge(['seg']);
  card({
    eyebrow:'8—10 分钟 · 一次只做一件事',
    title:'你的车取消了',
    text:'你叫 Camille，今晚必须到 Chamonix。到了巴黎里昂车站，大屏上写着一个词：<b>SUPPRIMÉ</b>（取消）。<br>接下来：<b>走向窗口，把问题说清楚，换一张能上车的票。</b>',
    tip:'三条规矩：① 每一步只做一件事；② 让你说的句子一律<b>说出声</b>；③ 没有评分，录音只给你自己听。<br>进对话前先过一遍「铺垫」：<b>点词 → 句式 → 整句</b>，画面和词是同时出现的 —— 先给耳朵足够的输入，再开口。',
    actions:[ act('🔊 先试一下声音', false, testSound, false) ]
  });
  setNav('好，开始 →', function(){ S.scene = 'situation'; render(); });
}

/* --- 情境（画面屏） --- */
function renderSituation(){
  stepLabel('第 0 步 · 只看画面');
  showHero(true); setBg('hall'); setSprite('thinking');
  setBadge(['sig']);
  clearSub('<b>画面里发生了什么？</b> 大屏上写着 <b>SUPPRIMÉ</b>：她的车没有了。先不看选项 —— 她现在会怎么办？说出声。');
  setNav('我想过了 → 先认几个词 ▸', function(){
    S.scene = 'leadin'; S.leadin = 0; render();
  });
}

/* --- 铺垫（可理解性输入 i+1，画面与词同屏）：w1 点词 → w2 句式 → w3 整句 --- */
function renderLeadin(){
  showHero(true); setBg('hall'); setSprite('thinking');
  if (S.leadin === 0)      leadinWords();
  else if (S.leadin === 1) leadinPattern();
  else                     leadinSentence();
}
/* 清掉三个铺垫层（render() 在非 leadin 场景也会调它兜底） */
function hideLeadin(){
  ['#hotspots','#word-card','#pattern-panel'].forEach(function(sel){
    var el = $(sel); if (el){ el.classList.add('hidden'); el.innerHTML = ''; }
  });
}
/* w1 · 点词：箭头热点 → 弹词卡（阴阳性色标 + 音频） */
function leadinWords(){
  stepLabel('铺垫 1 · 点一点：词');
  setBadge(['sig']);
  hideLeadin();
  clearSub('<b>画面上藏着今天要用的词。</b>点箭头 ▸ 听它、看它的性别 —— 词卡弹出时，它指的东西就在画面上。');
  var hs = $('#hotspots');
  hs.innerHTML = ''; hs.classList.remove('hidden');
  LEADIN_WORDS.forEach(function(w){
    var b = document.createElement('button');
    b.className = 'hot' + ((S.wordsSeen || []).indexOf(w.id) >= 0 ? ' seen' : '');
    b.style.left = w.hot[0] + '%'; b.style.top = w.hot[1] + '%';
    b.dataset.wid = w.id;
    b.setAttribute('aria-label', w.fr);
    b.textContent = '▸';
    b.onclick = function(){ showWordCard(w, b); };
    hs.appendChild(b);
  });
  setNav('词认得差不多了 → 看句式 ▸', function(){ S.leadin = 1; render(); });
}
function showWordCard(w, btn){
  if (!S.wordsSeen) S.wordsSeen = [];
  if (S.wordsSeen.indexOf(w.id) < 0) S.wordsSeen.push(w.id);
  $$('#hotspots .hot').forEach(function(x){ if (x !== btn) x.classList.remove('on'); });
  if (btn){ btn.classList.add('on'); btn.classList.add('seen'); }
  var g = GENDER[w.gender] || GENDER.m;
  var card = $('#word-card');
  card.innerHTML =
    (w.img ? '<img class="wc-img" alt="">' : '') +
    '<div class="wc-gender ' + g.cls + '">' + g.tag + (w.forms ? ' · ' + w.forms : '') + '</div>' +
    '<div class="wc-fr"></div>' +
    '<div class="wc-zh"></div>' +
    '<button class="wc-play">🔊 再听</button>';
  if (w.img){ var wi = card.querySelector('.wc-img'); wi.src = w.img; }
  card.querySelector('.wc-fr').textContent = w.fr;
  card.querySelector('.wc-zh').textContent = w.zh;
  var line = { id:w.id, name:'Le mot', cls:'camille', fr:w.fr, zh:w.zh, targets:[] };
  card.querySelector('.wc-play').onclick = function(){ playLine(line, 'window'); };
  card.classList.remove('hidden');
  playLine(line, 'window');
}
/* w2 · 句式：金框句式卡（SIGNAL 风格），读句式节奏版 */
function leadinPattern(){
  stepLabel('铺垫 2 · 句式：怎么开口');
  setBadge(['seg', 'sig']);
  hideLeadin();
  clearSub('<b>词要装进句式才是话。</b>金色部分是等会儿对话的重打 —— 跟读一遍它。');
  var p = $('#pattern-panel');
  p.innerHTML = '<div class="pp-title"></div>';
  p.querySelector('.pp-title').textContent = PATTERN.title;
  PATTERN.parts.forEach(function(pt){
    var row = document.createElement('div'); row.className = 'pp-row' + (pt.sig ? ' sig' : '');
    var fr = document.createElement('span'); fr.className = 'pp-fr'; fr.textContent = pt.fr;
    var zh = document.createElement('span'); zh.className = 'pp-zh'; zh.textContent = pt.zh;
    row.append(fr, zh); p.appendChild(row);
  });
  var full = document.createElement('div'); full.className = 'pp-full'; full.textContent = PATTERN.full;
  p.appendChild(full);
  p.classList.remove('hidden');
  playLine({ id:PATTERN.audio, name:'La structure', cls:'camille', fr:PATTERN.full, zh:'我想要一张去沙莫尼的票，麻烦您。', targets:['je voudrais','un billet'] }, 'window');
  setNav('记住句式了 → 听整句 ▸', function(){ S.leadin = 2; render(); });
}
/* w3 · 整句：完整句预听（这就是进对话后的第一句） */
function leadinSentence(){
  stepLabel('铺垫 3 · 完整句：听一遍');
  setBadge(['seg', 'sig']);
  hideLeadin();
  var o = TURNS[0].options[0];
  clearSub('<b>这就是等会儿对话里 Camille 的第一句。</b>先听一遍，感受节奏 —— 进对话后你也会选到它。');
  playLine({ id:o.id, name:'Camille', cls:'camille', fr:o.fr, zh:o.zh, targets:o.targets }, 'window');
  setNav('我准备好了 → 进对话 ▸', function(){
    S.scene = 'turns'; S.turn = 0; S.phase = 'see'; S.picked = null; S.prod = 0; render();
  });
}

/* --- 对话四段（分屏页面：see→choose→exchange→recap→followup→retell） --- */
function renderTurn(){
  var t = TURNS[S.turn], n = S.turn + 1;

  /* 看情境 + 预测（画面屏，刻意不出声） */
  if (S.phase === 'see'){
    stepLabel('第 ' + n + ' 段 · 看情境');
    setBadge(['seg']);
    showHero(true); setBg(t.bg.predict); setSprite(t.sprite.predict);
    clearSub(t.predict);
    setNav('我说过了 → 选一句 ▸', function(){ S.phase = 'choose'; render(); });
    return;
  }

  /* 选一句（任务屏） */
  if (S.phase === 'choose'){
    stepLabel('第 ' + n + ' 段 · 选一句');
    setBadge(['sig']);
    showHero(false);
    var box = document.createElement('div'); box.className = 'opts';
    t.options.forEach(function(o){
      var b = document.createElement('button');
      b.className = 'opt';
      b.innerHTML = '<span class="tg"></span><span class="frt"></span><span class="why"></span>';
      b.querySelector('.tg').textContent = o.tag;
      b.querySelector('.frt').textContent = o.fr;
      b.querySelector('.why').textContent = o.why;
      b.onclick = function(){ choose(o, b); };
      box.appendChild(b);
    });
    card({
      eyebrow:'第 ' + n + ' 段 / 共 4 段 · 目标：' + t.goal,
      title:'你会怎么说？',
      text:'点其中一个 —— 窗口里的人会<b>按你说的给信息</b>。',
      body:box,
      tip:'点之前先把两句都念一遍，说出它们的差别在哪。'
    });
    clearSub('（选一句 —— 下一步会放出你说的这句话 + 窗口的回应）');
    setNav('▶ 听他们的对话 ▸', function(){ S.phase = 'exchange'; render(); }, true);  // 选完才解锁
    return;
  }

  /* 听对话（画面屏：放出你说的话 + 窗口回应，表情随之变化） */
  if (S.phase === 'exchange'){
    stepLabel('第 ' + n + ' 段 · 听对话');
    setBadge(['sig']);
    showHero(true); setBg(t.bg.reveal); setSprite(t.sprite.predict);
    var o = t.options.filter(function(x){ return x.key === S.picked; })[0] || t.options[0];
    var rep = t.replies[S.picked] || t.replies[o.key];
    setSprite(t.sprite[S.picked] || t.sprite.predict);
    setNav('下一步 ▸', function(){
      S.phase = 'recap';   // exchange → recap → (followup|retell)；recap 若在此被跳过就成了死代码
      render();
    });
    playSeq([
      { id:o.id, name:'Camille', cls:'camille', fr:o.fr, zh:o.zh, targets:o.targets, anchor:'window' },
      { id:rep.id, name:'L\'agent du guichet', cls:'agent', fr:rep.fr, zh:rep.zh, targets:rep.targets, anchor:'window' }
    ], function(){ setSprite('neutral'); });
    return;
  }

  /* 听完对方（任务屏） */
  if (S.phase === 'recap'){
    stepLabel('第 ' + n + ' 段 · 听完');
    setBadge(['seg']);
    showHero(false);
    var needFu = (S.picked === 'B' && t.followup);
    card({
      eyebrow:'第 ' + n + ' 段 · 窗口的人刚说完',
      title:needFu ? '他的回答够你上车吗？' : '信息都拿到了',
      text:needFu
        ? '因为你问得少，他只给了<b>一半信息</b>。<br>真实对话就是这样：<b>说得多，换得多</b> —— 现在补问一句。'
        : '听层里是他刚才说的话。可以再听一遍，也可以直接进入复述。',
      tip:'听层左边有「中文释义」，但请<b>先猜</b> —— 猜过再看，记得更牢。',
      actions:[ act(needFu ? '补问一句 →' : '我来说一遍 →', false, function(){
                  S.phase = needFu ? 'followup' : 'retell'; render();
               }, false) ]
    });
    clearSub('（点 🔊 重听窗口里的人说了什么）');
    setNav('下一步 ▸', function(){
      S.phase = (S.picked === 'B' && t.followup) ? 'followup' : 'retell'; render();
    });
    return;
  }

  /* B 路径 · 追问（意义协商，任务屏） */
  if (S.phase === 'followup'){
    stepLabel('第 ' + n + ' 段 · 追问');
    setBadge(['seg']);
    showHero(false);   // 显式声明任务屏：不依赖 recap 遗留的 body 类名，否则卡片会被藏掉
    var fu = t.followup;
    var b2 = document.createElement('button'); b2.className = 'opt';
    b2.innerHTML = '<span class="tg">补问</span><span class="frt"></span><span class="why">把没问的换乘与差价一次问清楚</span>';
    b2.querySelector('.frt').textContent = fu.learner.fr;
    b2.onclick = function(){
      b2.classList.add('on'); b2.disabled = true; visited.push(fu.learner.id, fu.agent.id);
      playSeq([
        { id:fu.learner.id, name:'Camille', cls:'camille', fr:fu.learner.fr, zh:fu.learner.zh, targets:fu.learner.targets, anchor:'window' },
        { id:fu.agent.id, name:'L\'agent du guichet', cls:'agent', fr:fu.agent.fr, zh:fu.agent.zh, targets:fu.agent.targets, anchor:'window' }
      ], function(){ setSprite('relieved'); S.phase = 'retell'; render(); });
    };
    card({
      eyebrow:'第 ' + n + ' 段 · 这就是 negotiation of meaning',
      title:'换你再问一次',
      text:'同一个窗口，同一个问题 —— 这次换一个问法，看对方会不会把信息给全。',
      body:b2,
      tip:'注意：你的法语一直是正确的，只是信息量不够。这跟"说错"是两回事。'
    });
    clearSub('（点上面的「补问」会放出你的问题 + 窗口的回应）');
    setNav('下一步 ▸', function(){ S.phase = 'retell'; render(); });
    return;
  }

  /* 复述（任务屏） */
  if (S.phase === 'retell'){
    stepLabel('第 ' + n + ' 段 · 复述');
    setBadge(['seg']);
    showHero(false);
    var last = (S.turn === 3);
    card({
      eyebrow:'第 ' + n + ' 段 · 不看字幕，把这段重说一遍',
      title:'轮到你了',
      text:'把<b>你选择的 + 你听到的</b>连起来说一遍。可以录音，也可以只说给自己听。',
      body:recorderRow('rec-turn', 'rec-turn-state', function(){}, true),
      tip:'这里没有对错判定。说不出来的时候，回上一拍再听一遍就够了。',
      actions:[ act('✓ 我已说出（不录音）', false, function(){ S.prod++; render(); }, S.prod >= 1) ]
    });
    clearSub('（这一步没有新声音，复述给你自己听）');
    setNav(last ? '说完了 → 挑战：把范文填回来 ▸' : '说完了 → 下一段 ▸', function(){
      if (last){ S.scene = 'gaps'; S.gapActive = null; }
      else { S.turn++; S.phase = 'see'; S.picked = null; S.prod = 0; }  // prod 不归零的话，第 2 段起「我已说出」门槛一进来就已满足
      render();
    }, S.prod < 1);
    return;
  }
}

function choose(o, btnEl){
  if (S.picked) return;
  S.picked = o.key;
  $$('.opt').forEach(function(x){ x.classList.add('dim'); });
  btnEl.classList.remove('dim'); btnEl.classList.add('on');
  visited.push(o.id);
  // 选完即解锁「听他们的对话」
  setNav('▶ 听他们的对话 ▸', function(){ S.phase = 'exchange'; render(); }, false);
}

/* --- 挖空选词：把范文里的目标词亲手放回去（REMOVE 的镜像：先抽走，再亲手放回） --- */
function renderGaps(){
  stepLabel('输出 · 填空重建范文');
  setBadge(['rem']);
  showHero(false);
  var text = textModel();

  /* 按文本顺序把 7 个目标词换成空白按钮（用函数式替换，避开 String.replace 的 $ 转义陷阱） */
  var blanks = [];
  var segs = [text];
  GAPS.forEach(function(g){
    var re = new RegExp(g.key.replace(/ /g, '\\s+'), 'i');
    var out = [];
    segs.forEach(function(s){
      if (typeof s !== 'string'){ out.push(s); return; }
      var m = s.match(re);
      if (!m){ out.push(s); return; }
      out.push(s.slice(0, m.index));
      var b = document.createElement('button');
      b.className = 'gap-blank'; b.textContent = '＿＿＿＿';
      b.dataset.key = g.key;
      if ((S.gapDone || []).indexOf(g.key) >= 0){ b.dataset.filled = '1'; b.classList.add('ok'); b.textContent = g.key; }
      blanks.push(b);
      out.push(b);
      out.push(s.slice(m.index + m[0].length));
    });
    segs = out;
  });

  var line = document.createElement('div'); line.className = 'gap-line';
  segs.forEach(function(s){
    if (typeof s === 'string'){ line.appendChild(document.createTextNode(s)); }
    else line.appendChild(s);
  });

  /* 词池：7 正确 + 2 干扰，轻度旋转避免正确词全在最前 */
  var pool = document.createElement('div'); pool.className = 'gap-pool';
  var words = GAPS.map(function(g){ return g.key; }).concat(GAP_DISTRACTORS);
  words = words.slice(2).concat(words.slice(0, 2));
  words.forEach(function(w){
    var b = document.createElement('button'); b.className = 'gap-word'; b.textContent = w;
    GAPS.forEach(function(g){
      if (g.key === w && (S.gapDone || []).indexOf(g.key) >= 0){ b.disabled = true; b.classList.add('used'); }
    });
    b.onclick = function(){ fillGap(b, w); };
    pool.appendChild(b);
  });

  var wrap = document.createElement('div'); wrap.className = 'gap-wrap';
  wrap.appendChild(line); wrap.appendChild(pool);

  card({
    eyebrow:'输出 · REMOVE 的镜像',
    title:'范文被抽走了 7 个词',
    text:'这 7 个词就是你铺垫阶段认过的。从词池里<b>点词填回空白</b> —— 放对会变绿并读出这个词，放错会弹回来。填完全部，范文完整读一遍。',
    body:wrap,
    tip:'卡住时先念一遍整句 —— 语法和性别搭配（supprimée）会告诉你该填哪个。'
  });
  clearSub('（点词池里的词填空；填对每空都会读出该词）');

  function fillGap(btn, w){
    var target = blanks.filter(function(b){ return b.dataset.key === S.gapActive && !b.dataset.filled; })[0]
                 || blanks.filter(function(b){ return !b.dataset.filled; })[0];
    if (!target) return;
    var g = GAPS.filter(function(x){ return x.key === target.dataset.key; })[0];
    var ok = (w.toLowerCase() === g.key.toLowerCase()) ||
             (g.alt || []).some(function(a){ return a.toLowerCase() === w.toLowerCase(); });
    target.textContent = w;
    if (ok){
      target.dataset.filled = '1'; target.classList.add('ok');
      btn.classList.add('used'); btn.disabled = true;
      if (!S.gapDone) S.gapDone = [];
      S.gapDone.push(g.key);
      if (blanks.every(function(b){ return b.dataset.filled; })){
        // 最后一空：不再读单词，直接完整读范文（立即播，不用 setTimeout —— 否则用户翻页后音频才迟到）
        $('#nav-btn').disabled = false;
        playLine(findLine('R-MODEL'), 'train');
        note('7 空全对 —— 范文完整了。听一遍，下一步跟读出来。');
      } else if (g.audio){
        playLine({ id:g.audio, name:'Le mot', cls:'camille', fr:g.key, zh:g.zh, targets:[] }, 'window');
      }
    } else {
      target.classList.add('bad');
      setTimeout(function(){ target.textContent = '＿＿＿＿'; target.classList.remove('bad'); }, 450);
    }
  }

  setNav('填完了 → 听录音，跟读整句 ▸', function(){
    S.scene = 'echo'; S.echoIdx = 0; S.prod = 0; render();
  }, (S.gapDone || []).length < GAPS.length);
}

/* --- 听录音给出完整句子：听 → 合上 → 说（四句，为复述热身） --- */
function renderEcho(){
  if (S.echoIdx >= ECHO_LINES.length){
    S.scene = 'retell'; S.level = 1; S.prod = 0; render(); return;
  }
  var l = findLine(ECHO_LINES[S.echoIdx]);
  var n = S.echoIdx + 1;
  stepLabel('输出 · 听录音 · 说整句 ' + n + '/4');
  setBadge(['rem']);
  showHero(false);

  var shown = false;
  var txt = document.createElement('p'); txt.className = 'echo-fr'; txt.style.visibility = 'hidden'; txt.textContent = l.fr;
  var zh = document.createElement('p'); zh.className = 'echo-zh'; zh.textContent = l.zh;
  var btns = document.createElement('div'); btns.className = 'echo-btns';
  var hear = document.createElement('button'); hear.className = 'act primary'; hear.textContent = '🔊 听这句';
  hear.onclick = function(){ playLine(l, 'window'); };
  var peek = document.createElement('button'); peek.className = 'act ghost'; peek.textContent = '👀 看一眼';
  peek.onclick = function(){
    shown = !shown;
    txt.style.visibility = shown ? 'visible' : 'hidden';
    peek.textContent = shown ? '🙈 藏起来' : '👀 看一眼';
  };
  btns.append(hear, peek);

  var wrap = document.createElement('div'); wrap.className = 'echo-wrap';
  wrap.append(btns, txt, zh, recorderRow('rec-echo', 'rec-echo-state', function(){ S.prod++; if (S.scene === 'echo') render(); }, true));

  card({
    eyebrow:'听 → 合上 → 说',
    title:'先听，再把它完整说出声',
    text:'先只听。然后<b>不</b>看句子，把它完整说出声 —— 说不出来再看一眼，看完<b>合上重说</b>。',
    body:wrap,
    tip:'拆成三块更好背：谁开口（je voudrais…）→ 要什么 → 为什么。',
    actions:[ act('✓ 我已说出（不录音）', false, function(){ S.prod++; render(); }, S.prod >= 1) ]
  });
  clearSub('（点 🔊 听这句 —— 说的时候把字幕当「合上的书」）');
  setNav(n < 4 ? '说完了 → 下一句 ▸' : '说完了 → 最后一关：讲给朋友听 ▸', function(){
    S.echoIdx++; S.prod = 0; render();
  }, S.prod < 1);
}

/* --- 最后一关：Raconte à un ami（四级支架，强制产出才降级，任务屏） --- */
function renderRetell(){
  var lv = LEVELS[S.level - 1];
  stepLabel(lv.eyebrow);
  setBadge(S.level === 1 ? ['seg'] : ['fade']);
  showHero(false); setSprite('thinking');

  var body = document.createElement('div');
  if (S.level === 1){
    body.className = 'l1';
    var note = document.createElement('p'); note.className = 'lv-note';
    note.textContent = '你这一路走过的句子（点 🔊 重听）：'; body.appendChild(note);
    if (!visited.length){ note.textContent = '（还没有句子 —— 回到对话区走一遍就能看到）'; }
    visited.forEach(function(id){
      var row = document.createElement('div'); row.className = 'l1-line';
      var tx = document.createElement('span'); tx.textContent = findVisited(id);
      var b = document.createElement('button'); b.textContent = '🔊';
      b.onclick = function(){ playLine(findLine(id), 'window'); };
      row.append(tx, b); body.appendChild(row);
    });
  }
  if (S.level === 2){
    body.className = 'kw';
    ['arriver à la gare','voir que…','le train supprimé','le guichet','un incident technique',
     'échanger le billet','une correspondance','15 h 05','quai 7','sans supplément'].forEach(function(w){
      var s = document.createElement('span'); s.textContent = w; body.appendChild(s);
    });
  }
  if (S.level === 3){
    body.innerHTML = '<pre class="frame">D\'abord, je suis a______ à la gare de Lyon et j\'ai v__ que mon train\npour C________ était s______.\nEnsuite, je suis a____ au g______ pour demander un r____________.\nL\'agent m\'a expliqué qu\'il y a____ un i______ t________.\nHeureusement, il a p__ échanger mon billet.\nFinalement, j\'ai p___ le train de 15 h 05, q___ 7, avec une c____________\nà Saint-Gervais, sans s________.</pre>';
  }

  card({
    eyebrow:lv.eyebrow, title:lv.title,
    text:'看着这张图，用<b>过去时</b>把刚才发生的事完整讲一遍：到车站 → 看到什么 → 去窗口 → 结果怎样。',
    body:body,
    tip:lv.tip,
    actions:[
      act('✓ 我已说出（不录音）', false, function(){ S.prod++; render(); }, S.prod >= 1)
    ]
  });
  clearSub('（这一步没有新声音，讲给你自己听）');
  // 录音行
  var host = document.createElement('div'); host.className = 'rec-row';
  $('#card-body').appendChild(host);
  setupRecorder(host, function(){ S.prod++; if (S.scene === 'retell') render(); });

  var isLastLevel = (S.level === 4);
  setNav(isLastLevel ? '我说完了 → 对一下参考版本 ▸' : '↓ 撤掉这一层提示 ▸', function(){
    if (isLastLevel){ S.scene = 'done'; render(); return; }
    S.level++; S.prod = 0; render();
  }, S.prod < 1);
}

function findVisited(id){ var l = findLine(id); return l ? l.fr : id; }
function findLine(id){
  var out = null;
  TURNS.forEach(function(t){
    t.options.forEach(function(o){
      if (o.id === id) out = { id:id, name:'Camille', cls:'camille', fr:o.fr, zh:o.zh, targets:o.targets };
      var r = t.replies[o.key];
      if (r.id === id) out = { id:id, name:'L\'agent du guichet', cls:'agent', fr:r.fr, zh:r.zh, targets:r.targets };
    });
    if (t.followup){
      if (t.followup.learner.id === id) out = { id:id, name:'Camille', cls:'camille', fr:t.followup.learner.fr, zh:t.followup.learner.zh, targets:t.followup.learner.targets };
      if (t.followup.agent.id === id) out = { id:id, name:'L\'agent du guichet', cls:'agent', fr:t.followup.agent.fr, zh:t.followup.agent.zh, targets:t.followup.agent.targets };
    }
  });
  if (id === 'R-MODEL') out = { id:'R-MODEL', name:'Camille', cls:'camille', fr:textModel(), zh:'', targets:[] };
  return out;
}

/* --- 收尾（任务屏：参考版本是文字内容，必须在 task 屏才看得见） --- */
function renderDone(){
  stepLabel('完成');
  setBadge(['fade']);
  showHero(false); setBg('platform'); setSprite('relieved');  // 参考版本是文字内容，必须占 task 屏，否则被 body.show-scene #card{display:none} 藏掉
  card({
    eyebrow:'最后一关 · 参考版本',
    title:'这是可以达到的样子',
    text:'D\'abord, je suis arrivée à la gare de Lyon et j\'ai vu que mon train pour Chamonix était supprimé. Ensuite, je suis allée au guichet pour demander un renseignement. L\'agent m\'a expliqué qu\'il y avait un incident technique. Heureusement, il a pu échanger mon billet. Finalement, j\'ai pris le train de 15 h 05, quai 7, avec une correspondance à Saint-Gervais, sans supplément.',
    tip:'对照时只看三件事：<b>时态</b>（passé composé 串事件 / imparfait 述状态）、<b>连接词</b>、有没有<b>换乘与差价</b>这两个关键点。',
    actions:[
      act('🔊 听一遍', true, function(){ playLine(findLine('R-MODEL'), 'train'); }, false),
      act('看看这节课的设计说明', false, function(){ openDrawer(true); }, false),
      act('↺ 再走一遍', false, function(){ S = { scene:'intro', turn:0, phase:'see', picked:null, level:1, prod:0, leadin:0, wordsSeen:[], gapDone:[], gapActive:null, echoIdx:0 }; render(); }, false)
    ]
  });
  clearSub('（点 🔊 听一遍，可以对照参考版本）');
  setNav('');   // 收尾页用卡片按钮，隐藏翻页条
}
function textModel(){ return 'D\'abord, je suis arrivée à la gare de Lyon et j\'ai vu que mon train pour Chamonix était supprimé. Ensuite, je suis allée au guichet pour demander un renseignement. L\'agent m\'a expliqué qu\'il y avait un incident technique. Heureusement, il a pu échanger mon billet. Finalement, j\'ai pris le train de 15 h 05, quai 7, avec une correspondance à Saint-Gervais, sans supplément.'; }

/* ---------------- 录音（本地，不上传，无评分） ---------------- */
function recorderRow(id, stateId, done, compact){
  var box = document.createElement('div');
  box.className = 'rec-row' + (compact ? '' : ' big');
  var b = document.createElement('button'); b.className = 'rec'; b.textContent = '● 录音';
  var s = document.createElement('span'); s.className = 'rec-state'; s.id = stateId;
  box.append(b, s);
  setupRecorder(box, done, b, s);
  return box;
}
function setupRecorder(host, done, b, s){
  if (!b){ host.innerHTML = '<button class="rec">● 录音</button><span class="rec-state"></span>'; }
  b = b || host.querySelector('.rec');
  s = s || host.querySelector('.rec-state');
  var rec = null, chunks = [];
  b.onclick = function(){
    if (rec && rec.state === 'recording'){ rec.stop(); return; }
    navigator.mediaDevices.getUserMedia({ audio:true }).then(function(stream){
      rec = new MediaRecorder(stream); chunks = [];
      rec.ondataavailable = function(e){ chunks.push(e.data); };
      rec.onstop = function(){
        stream.getTracks().forEach(function(t){ t.stop(); });
        b.classList.remove('recording'); b.textContent = '● 录音';
        s.textContent = '录好了 ✓（只在本页，刷新即消失）';
        try{ speechSynthesis.cancel(); }catch(e){}
        done(URL.createObjectURL(new Blob(chunks, { type:'audio/webm' })));
      };
      rec.start();
      b.classList.add('recording'); b.textContent = '■ 停止';
      s.textContent = '录音中… 说完点停止';
    }).catch(function(){
      s.textContent = '麦克风没给权限 —— 也可以只说给自己听，然后点「我已说出」。';
    });
  };
}

/* ---------------- REMOVE：三态标记 ---------------- */
var RM = ['KEEP','DELAY','REMOVE'];
$$('.rm').forEach(function(el){
  el.addEventListener('click', function(e){
    if (!document.body.classList.contains('mode-remove')) return;
    if (e.target.closest('#card-actions')) return;
    var i = RM.indexOf(el.dataset.state || '');
    el.dataset.state = RM[(i + 1) % 3];
    if (el.dataset.state === 'REMOVE') el.classList.add('gone'); else el.classList.remove('gone');
    putTray(el);
  });
});
function putTray(el){
  var tray = $('#tray'), list = $('#tray-list');
  var prev = list.querySelector('[data-for="' + el.dataset.rmName + '"]');
  if (prev) prev.remove();
  if (el.dataset.state !== 'DELAY'){ return; }
  tray.classList.remove('hidden');
  var s = document.createElement('span');
  s.dataset.for = el.dataset.rmName;
  s.textContent = '⏱ ' + el.dataset.rmName;
  s.onclick = function(e){
    e.stopPropagation();
    el.dataset.state = ''; el.classList.remove('gone');
    s.remove();
    if (!list.children.length) tray.classList.add('hidden');
  };
  list.appendChild(s);
}

/* ---------------- SIGNAL：高亮 + 引导线 ---------------- */
var guide = $('#guide');
function drawGuide(fromEl, key){
  var a = document.querySelector('.anchor[data-anchor="' + (key || 'window') + '"]');
  if (!a) return;
  var x = fromEl.getBoundingClientRect(), y = a.getBoundingClientRect();
  guide.innerHTML = '';
  var ln = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  ln.setAttribute('x1', x.left + x.width / 2); ln.setAttribute('y1', x.top + x.height / 2);
  ln.setAttribute('x2', y.left + y.width / 2); ln.setAttribute('y2', y.top + y.height / 2);
  guide.appendChild(ln);
  a.classList.remove('pulse'); void a.offsetWidth; a.classList.add('pulse');
  setTimeout(function(){ guide.innerHTML = ''; }, 2200);
}
document.addEventListener('click', function(e){
  if (!document.body.classList.contains('mode-signal')) return;
  var t = e.target.closest('.target');
  if (t) drawGuide(t, t.dataset.anchor);
});

/* ---------------- 抽屉与右上角 chips ---------------- */
function openDrawer(on){ $('#drawer').classList.toggle('hidden', !on); }
$('#btn-info').onclick = function(){ openDrawer($('#drawer').classList.contains('hidden')); };
$('#drawer-close').onclick = function(){ openDrawer(false); };

var HINT = {
  remove:'REMOVE 已开：带虚线框的东西可以点 —— KEEP 保留 / DELAY 延后（收进左下角托盘）/ REMOVE 删掉。试试删掉画面上的 SUPPRIMÉ 或中文释义，看看还能不能懂。',
  signal:'SIGNAL 已开：字幕里金色的就是这一段要提取的表达。点金色词，会有一条线连到画面里对应的东西。'
};
$$('.chip[data-act]').forEach(function(c){
  c.onclick = function(){
    var k = c.dataset.act;
    var on = document.body.classList.toggle('mode-' + k);
    $$('.chip[data-act]').forEach(function(x){ x.classList.remove('on'); });
    if (on) c.classList.add('on');
    var tipEl = (S.scene === 'turns' && S.phase === 'choose') ? null : $('#card-tip');
    // 提示写进当前可见的提示区：任务屏用 #card-tip，画面屏用听层 note
    if (on){
      if (document.body.classList.contains('show-task') && tipEl) tipEl.innerHTML = HINT[k];
      else note(HINT[k]);
    } else {
      if (document.body.classList.contains('show-task') && tipEl) tipEl.innerHTML = '';
      else note('');
    }
    if (k === 'remove' && !on){
      $$('.rm').forEach(function(el){ el.dataset.state = ''; el.classList.remove('gone'); });
      $('#tray').classList.add('hidden'); $('#tray-list').innerHTML = '';
    }
  };
});

/* ---------------- 听层控制 ---------------- */
$('#zh-btn').onclick = function(){
  var z = $('#zh'); z.classList.toggle('hidden');
  $('#zh-btn').textContent = z.classList.contains('hidden') ? '中文释义（先猜）' : '收起中文';
};
$('#replay-btn').onclick = function(){ if (lastLine) playLine(lastLine, 'window'); };
// 补救按钮：手动重播当前句（这一次是在真实点击里，必然被允许）
$('#play-btn').onclick = function(){
  playBtn(false); note('');
  if (lastLine) playLine(lastLine, lastLine.anchor || 'window');
  else playLine(findLine('R-MODEL'), 'train');
};
$('#slow-btn').onclick = function(){
  slow = !slow; cache = {};
  $('#slow-btn').textContent = slow ? '🐢 慢速（开）' : '🐢 慢速';
};

/* ---------------- 启动 ---------------- */
// 直接双击 html 打开时 fetch 会被拦，词级时间轴拿不到。音频本身仍会播（已做兜底），但要说明白。
if (location.protocol === 'file:'){
  window.addEventListener('load', function(){
    note('检测到你是直接双击文件打开的（地址栏是 file://）。声音能放，但逐词高亮与唱词同步用不了 —— 建议改用 http 地址打开。', true);
  });
}

render();
