// 버전 올리기: node tools/bump.js [파일]   (기본 index.html)
// 형식 major.minor.letter.num  예) 1.0.a.1
// 맨 뒤 숫자 1-9 → 9 다음은 알파벳이 한 칸(a→b), 숫자는 1로
// 알파벳 z 다음은 minor(0-9)가 올라가고 a.1로, minor 9 다음은 major가 올라갑니다.
const fs=require('fs');
function next(v){let [ma,mi,l,n]=v.split('.');ma=+ma;mi=+mi;n=+n;let c=l.charCodeAt(0)-96;
 if(++n>9){n=1;if(++c>26){c=1;if(++mi>9){mi=0;ma++}}}
 return `${ma}.${mi}.${String.fromCharCode(96+c)}.${n}`}
if(require.main===module){const f=process.argv[2]||'index.html';let s=fs.readFileSync(f,'utf8');
 const m=s.match(/const VER="(\d+\.\d+\.[a-z]\.\d)"/);if(!m){console.error('VER 줄을 찾지 못했습니다');process.exit(1)}
 const v=next(m[1]);fs.writeFileSync(f,s.replace(m[0],`const VER="${v}"`));console.log(m[1]+' → '+v);const sw=require('path').join(require('path').dirname(f),'sw.js');if(fs.existsSync(sw))fs.writeFileSync(sw,fs.readFileSync(sw,'utf8').replace(/const V="bsn-[^"]*"/,`const V="bsn-${v}"`))}
module.exports={next};
