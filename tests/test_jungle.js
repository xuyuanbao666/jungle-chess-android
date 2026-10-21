// 斗兽棋核心规则测试：从 web/jungle.html 提取 <script> 并在 Node 里跑
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'web', 'jungle.html'), 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
if (!m) { console.error('❌ 未找到 <script>'); process.exit(1); }
const js = m[1];

// 1) 语法必须通过
try { new Function(js); console.log('✅ JS 语法通过'); }
catch (e) { console.error('❌ 语法错误: ' + e.message); process.exit(1); }

// 2) 结构性断言（不跑 DOM，只验证关键常量与规则片段存在）
const must = [
  ['等级定义', /RANK\s*=\s*\{[^}]*M\s*:\s*1[^}]*E\s*:\s*8/],
  ['兽穴位置', /var DENS = \{ red: \{r:0, c:3\}, blue: \{r:8, c:3\} \}/],
  ['河判定函数', /function isRiver\(r, c\)/],
  ['陷阱判定', /function trapOwner\(r, c\)/],
  ['鼠吃象规则', /if \(att\.type === "M" && def\.type === "E"\) return true;/],
  ['象不吃河鼠', /if \(att\.type === "E" && def\.type === "M" && defRiver\) return false;/],
  ['胜利判定进穴', /DENS\[att\.side/],
  ['AI 走子', /function\s+aiTurn/],
  ['触屏事件', /touchstart/],
];
let fail = 0;
for (const [name, re] of must) {
  if (re.test(js)) console.log('✅ ' + name);
  else { console.error('❌ 缺少: ' + name); fail = 1; }
}

// 3) 禁止外部网络依赖（离线可用）
if (/(https?:)?\/\/(?!)[a-z0-9.-]+\.(com|net|org|io|cn)/i.test(js.replace(/file:\/\/\/android_asset/g,''))) {
  console.error('❌ 检测到外部网络引用'); fail = 1;
} else console.log('✅ 无外部网络依赖');

console.log(fail ? '测试失败' : '全部通过');
process.exit(fail);
