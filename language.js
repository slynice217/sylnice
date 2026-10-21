/* Shared site-wide Simplified/Traditional Chinese switch. */
(function () {
  const toggles = Array.from(document.querySelectorAll('#site-language-toggle'));
  if (!toggles.length) return;
  let language = 'cn';
  try {
    const savedLanguage = window.localStorage.getItem('sylnice-language');
    if (savedLanguage === 'cn' || savedLanguage === 'tw') language = savedLanguage;
  } catch (e) { /* Storage may be unavailable in some browsing contexts. */ }
  let toTraditional = null;
  let toSimplified = null;
  try {
    if (window.OpenCC && typeof window.OpenCC.Converter === 'function') {
      toTraditional = window.OpenCC.Converter({ from: 'cn', to: 'tw' });
      toSimplified = window.OpenCC.Converter({ from: 'tw', to: 'cn' });
    }
  } catch (e) { /* Use the built-in fallback if the optional converter is unavailable. */ }
  const pairs = {
    '汉':'漢','马':'馬','龙':'龍','门':'門','风':'風','云':'雲','万':'萬','与':'與','业':'業','东':'東','丝':'絲','两':'兩','为':'為','丽':'麗','举':'舉','义':'義','乐':'樂','习':'習','乡':'鄉','书':'書','买':'買','乱':'亂','争':'爭','于':'於','亏':'虧','亲':'親','亿':'億','仅':'僅','从':'從','们':'們','价':'價','优':'優','会':'會','伟':'偉','传':'傳','伤':'傷','体':'體','余':'餘','侠':'俠','侣':'侶','儿':'兒','兑':'兌','党':'黨','兰':'蘭','关':'關','兴':'興','养':'養','内':'內','冈':'岡','册':'冊','写':'寫','军':'軍','农':'農','冲':'沖','决':'決','况':'況','冻':'凍','净':'淨','凉':'涼','减':'減','几':'幾','凤':'鳳','击':'擊','刘':'劉','刚':'剛','创':'創','别':'別','制':'製','剂':'劑','剑':'劍','剧':'劇','劝':'勸','办':'辦','务':'務','动':'動','励':'勵','劳':'勞','势':'勢','区':'區','医':'醫','华':'華','协':'協','单':'單','卖':'賣','卫':'衛','历':'歷','压':'壓','厕':'廁','县':'縣','参':'參','双':'雙','发':'發','变':'變','叠':'疊','号':'號','叹':'嘆','听':'聽','吗':'嗎','启':'啟','员':'員','呜':'嗚','响':'響','哑':'啞','哗':'嘩','唤':'喚','喷':'噴','团':'團','园':'園','图':'圖','圆':'圓','场':'場','坏':'壞','块':'塊','坚':'堅','坛':'壇','坝':'壩','墙':'牆','声':'聲','壳':'殼','处':'處','备':'備','复':'復','够':'夠','头':'頭','夹':'夾','夺':'奪','奋':'奮','奖':'獎','妇':'婦','妈':'媽','孙':'孫','学':'學','宁':'寧','宝':'寶','实':'實','审':'審','宪':'憲','宽':'寬','宾':'賓','对':'對','寻':'尋','导':'導','将':'將','尘':'塵','尝':'嘗','尽':'盡','层':'層','属':'屬','岁':'歲','岛':'島','岭':'嶺','币':'幣','师':'師','帐':'帳','带':'帶','帮':'幫','干':'幹','广':'廣','庆':'慶','应':'應','庙':'廟','废':'廢','开':'開','异':'異','弃':'棄','张':'張','弯':'彎','弹':'彈','强':'強','归':'歸','当':'當','录':'錄','彻':'徹','径':'徑','忆':'憶','忧':'憂','怀':'懷','态':'態','总':'總','恋':'戀','恶':'惡','恼':'惱','惊':'驚','惨':'慘','惩':'懲','惯':'慣','愤':'憤','愿':'願','懒':'懶','戏':'戲','战':'戰','户':'戶','扑':'撲','扩':'擴','扫':'掃','扬':'揚','扰':'擾','抚':'撫','抢':'搶','护':'護','报':'報','担':'擔','拟':'擬','拢':'攏','拥':'擁','择':'擇','挂':'掛','挤':'擠','挥':'揮','损':'損','换':'換','据':'據','掷':'擲','揽':'攬','搅':'攪','摆':'擺','摇':'搖','敌':'敵','数':'數','斋':'齋','断':'斷','无':'無','旧':'舊','时':'時','显':'顯','晓':'曉','暂':'暫','术':'術','机':'機','杀':'殺','杂':'雜','权':'權','条':'條','来':'來','杨':'楊','极':'極','构':'構','枪':'槍','枫':'楓','柜':'櫃','标':'標','栋':'棟','栏':'欄','树':'樹','样':'樣','档':'檔','桥':'橋','梦':'夢','检':'檢','楼':'樓','欢':'歡','欧':'歐','残':'殘','气':'氣','汉':'漢','汤':'湯','沟':'溝','没':'沒','沧':'滄','沪':'滬','泪':'淚','泷':'瀧','泸':'瀘','泻':'瀉','泽':'澤','洁':'潔','浅':'淺','浆':'漿','浇':'澆','浊':'濁','测':'測','济':'濟','浑':'渾','浓':'濃','涂':'塗','涛':'濤','涝':'澇','涡':'渦','润':'潤','涨':'漲','淀':'澱','渊':'淵','渔':'漁','温':'溫','湾':'灣','湿':'濕','溃':'潰','滚':'滾','满':'滿','滤':'濾','滥':'濫','滨':'濱','滩':'灘','灭':'滅','灯':'燈','灵':'靈','灾':'災','灿':'燦','炉':'爐','炼':'煉','烂':'爛','烟':'煙','烦':'煩','烧':'燒','热':'熱','爱':'愛','爷':'爺','牵':'牽','犹':'猶','狱':'獄','猫':'貓','现':'現','环':'環','电':'電','画':'畫','疗':'療','疯':'瘋','痒':'癢','瘫':'癱','皱':'皺','盐':'鹽','盘':'盤','着':'著','矿':'礦','码':'碼','砖':'磚','砚':'硯','确':'確','碍':'礙','礼':'禮','祸':'禍','离':'離','种':'種','积':'積','称':'稱','稳':'穩','窃':'竊','窍':'竅','竞':'競','笔':'筆','笼':'籠','筑':'築','筛':'篩','签':'簽','简':'簡','类':'類','紧':'緊','红':'紅','纤':'纖','级':'級','纪':'紀','纬':'緯','纯':'純','纱':'紗','纲':'綱','纳':'納','纵':'縱','纷':'紛','纸':'紙','纹':'紋','纽':'紐','线':'線','练':'練','组':'組','细':'細','织':'織','终':'終','绍':'紹','经':'經','绑':'綁','结':'結','绕':'繞','绘':'繪','给':'給','绝':'絕','统':'統','绢':'絹','绣':'繡','继':'繼','绩':'績','绪':'緒','续':'續','绳':'繩','维':'維','绵':'綿','综':'綜','绿':'綠','缘':'緣','编':'編','网':'網','罗':'羅','罚':'罰','罢':'罷','职':'職','联':'聯','聪':'聰','肃':'肅','肠':'腸','肤':'膚','肾':'腎','胀':'脹','胆':'膽','胜':'勝','脑':'腦','脚':'腳','脸':'臉','腾':'騰','舰':'艦','舱':'艙','艺':'藝','节':'節','苍':'蒼','苏':'蘇','范':'範','荣':'榮','药':'藥','莲':'蓮','莺':'鶯','萝':'蘿','萧':'蕭','蓝':'藍','虑':'慮','虚':'虛','虫':'蟲','虽':'雖','蚁':'蟻','蚂':'螞','蚕':'蠶','蛮':'蠻','蝇':'蠅','补':'補','袜':'襪','装':'裝','见':'見','观':'觀','规':'規','视':'視','览':'覽','觉':'覺','触':'觸','誉':'譽','计':'計','认':'認','让':'讓','训':'訓','议':'議','记':'記','讲':'講','许':'許','论':'論','设':'設','访':'訪','证':'證','评':'評','识':'識','词':'詞','译':'譯','试':'試','诗':'詩','诚':'誠','话':'話','询':'詢','该':'該','详':'詳','语':'語','误':'誤','说':'說','请':'請','诸':'諸','读':'讀','课':'課','谁':'誰','调':'調','谈':'談','谋':'謀','谢':'謝','谣':'謠','谦':'謙','谨':'謹','贝':'貝','负':'負','贡':'貢','财':'財','责':'責','败':'敗','账':'帳','货':'貨','质':'質','贩':'販','贪':'貪','贫':'貧','购':'購','贮':'貯','贯':'貫','贱':'賤','贴':'貼','贵':'貴','贸':'貿','费':'費','贺':'賀','贼':'賊','资':'資','赋':'賦','赌':'賭','赏':'賞','赔':'賠','赖':'賴','赚':'賺','赛':'賽','赞':'讚','赵':'趙','赶':'趕','趋':'趨','跃':'躍','践':'踐','踊':'踴','踪':'蹤','车':'車','转':'轉','轮':'輪','软':'軟','轰':'轟','轻':'輕','载':'載','较':'較','辅':'輔','辆':'輛','辉':'輝','输':'輸','边':'邊','达':'達','迁':'遷','过':'過','迈':'邁','运':'運','还':'還','这':'這','进':'進','远':'遠','连':'連','迟':'遲','遗':'遺','邮':'郵','邻':'鄰','郑':'鄭','酱':'醬','释':'釋','钟':'鐘','钉':'釘','针':'針','钢':'鋼','钥':'鑰','钱':'錢','铁':'鐵','铜':'銅','银':'銀','错':'錯','锦':'錦','镜':'鏡','长':'長','闪':'閃','问':'問','闭':'閉','闯':'闖','间':'間','闷':'悶','闹':'鬧','闻':'聞','阅':'閱','队':'隊','阳':'陽','阴':'陰','阵':'陣','阶':'階','际':'際','陆':'陸','陈':'陳','险':'險','随':'隨','隐':'隱','难':'難','雾':'霧','静':'靜','韦':'韋','页':'頁','顺':'順','须':'須','顾':'顧','顿':'頓','领':'領','频':'頻','题':'題','颜':'顏','风':'風','飞':'飛','饭':'飯','饮':'飲','饰':'飾','饱':'飽','饼':'餅','饿':'餓','馆':'館','马':'馬','驴':'驢','驶':'駛','骑':'騎','骗':'騙','骚':'騷','鱼':'魚','鲜':'鮮','鸟':'鳥','鸡':'雞','鸣':'鳴','鸭':'鴨','鹅':'鵝','麦':'麥','黄':'黃','齐':'齊','齿':'齒','龄':'齡','龙':'龍','龟':'龜'
  };
  const fallbackMap = new Map(Object.entries(pairs));
  const reverseMap = new Map();
  for (const [s, t] of fallbackMap) if (!reverseMap.has(t)) reverseMap.set(t, s);
  const fallbackConvert = (text, target) => Array.from(text).map(ch => target === 'tw' ? (fallbackMap.get(ch) || ch) : (reverseMap.get(ch) || ch)).join('');
  const convert = (text, target) => {
    const fn = target === 'tw' ? toTraditional : toSimplified;
    try { if (fn) return fn(text); } catch (e) {}
    return fallbackConvert(text, target);
  };
  const originals = new WeakMap();
  const originalAttrs = new WeakMap();
  const attrs = ['title', 'aria-label', 'placeholder', 'alt'];
  function process(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const el = node.parentElement;
        if (!el || el.closest('#site-language-toggle,script,style,noscript,textarea,input,code,pre,[contenteditable="true"]')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (!originals.has(node)) originals.set(node, node.nodeValue);
      const original = originals.get(node);
      const next = convert(original, language);
      if (node.nodeValue !== next) node.nodeValue = next;
    });
    const elements = root.querySelectorAll ? root.querySelectorAll('*') : [];
    elements.forEach(el => {
      if (el.closest('#site-language-toggle')) return;
      attrs.forEach(attr => {
        if (!el.hasAttribute(attr)) return;
        let saved = originalAttrs.get(el);
        if (!saved) {
          saved = new Map();
          originalAttrs.set(el, saved);
        }
        if (!saved.has(attr)) saved.set(attr, el.getAttribute(attr));
        const next = convert(saved.get(attr), language);
        if (el.getAttribute(attr) !== next) el.setAttribute(attr, next);
      });
    });
  }
  function syncToggles() {
    toggles.forEach(toggle => {
      toggle.dataset.lang = language;
      toggle.setAttribute('aria-checked', language === 'tw' ? 'true' : 'false');
    });
  }
  syncToggles();
  document.documentElement.lang = language === 'tw' ? 'zh-Hant' : 'zh-Hans';
  toggles.forEach(toggle => toggle.addEventListener('click', function () {
    language = language === 'cn' ? 'tw' : 'cn';
    try { window.localStorage.setItem('sylnice-language', language); } catch (e) {}
    document.documentElement.lang = language === 'tw' ? 'zh-Hant' : 'zh-Hans';
    syncToggles();
    process(document.body);
  }));
  process(document.body);
  const observer = new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'characterData') {
        const node = record.target;
        if (originals.has(node)) { const next = convert(originals.get(node), language); if (node.nodeValue !== next) node.nodeValue = next; }
        else process(node.parentElement || document.body);
      } else record.addedNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) process(node.parentElement || document.body);
        else if (node.nodeType === Node.ELEMENT_NODE && !node.closest('#site-language-toggle')) process(node);
      });
    }
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
})();
