// script.js

// —— Các bảng dữ liệu cơ bản ——

const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];

const MENH_NGU_HANH = {
  "Giáp Tý":"Bính Lò Hỏa","Ất Sửu":"Bính Lò Hỏa",
  "Bính Dần":"Đại Khê Thủy","Đinh Mão":"Đại Khê Thủy",
  "Mậu Thìn":"Sa Trung Kim","Kỷ Tỵ":"Sa Trung Kim",
  "Canh Ngọ":"Tích Lịch Hỏa","Tân Mùi":"Tích Lịch Hỏa",
  "Nhâm Thân":"Kiếm Phong Kim","Quý Dậu":"Kiếm Phong Kim",
  "Giáp Tuất":"Hải Trung Kim","Ất Hợi":"Hải Trung Kim",
  "Bính Tý":"Bích Thượng Thổ","Đinh Sửu":"Bích Thượng Thổ",
  "Mậu Dần":"Thạch Lựu Mộc","Kỷ Mão":"Thạch Lựu Mộc",
  "Canh Thìn":"Kiếm Phong Kim","Tân Tỵ":"Kiếm Phong Kim",
  "Nhâm Ngọ":"Dương Liễu Mộc","Quý Mùi":"Dương Liễu Mộc",
  "Giáp Thân":"Tuyền Trung Thủy","Ất Dậu":"Tuyền Trung Thủy",
  "Bính Tuất":"Ốc Thượng Thổ","Đinh Hợi":"Ốc Thượng Thổ",
  "Mậu Tý":"Thích Lịch Hỏa","Kỷ Sửu":"Thích Lịch Hỏa",
  "Canh Dần":"Tùng Bách Mộc","Tân Mão":"Tùng Bách Mộc",
  "Nhâm Thìn":"Trường Lưu Thủy","Quý Tỵ":"Trường Lưu Thủy",
  "Giáp Ngọ":"Sa Trung Kim","Ất Mùi":"Sa Trung Kim",
  "Bính Thân":"Sơn Hạ Hỏa","Đinh Dậu":"Sơn Hạ Hỏa",
  "Mậu Tuất":"Bình Địa Mộc","Kỷ Hợi":"Bình Địa Mộc",
  "Canh Tý":"Bích Thượng Thổ","Tân Sửu":"Bích Thượng Thổ",
  "Nhâm Dần":"Kim Bạch Kim","Quý Mão":"Kim Bạch Kim",
  "Giáp Thìn":"Phú Đăng Hỏa","Ất Tỵ":"Phú Đăng Hỏa"
};

const CUNG_PHI_NAM = {1:"Khảm",2:"Khảm",3:"Chấn",4:"Tốn",5:"Cấn",6:"Càn",7:"Đoài",8:"Cấn",9:"Ly"};
const CUNG_PHI_NU  = {1:"Cấn",2:"Khôn",3:"Chấn",4:"Tốn",5:"Khôn",6:"Càn",7:"Đoài",8:"Cấn",9:"Ly"};

const H_TOT = {
  "Đông Tứ Mệnh":["Đông","Đông Nam","Nam","Bắc"],
  "Tây Tứ Mệnh":["Tây","Tây Bắc","Tây Nam","Đông Bắc"]
};
const H_XAU = {
  "Đông Tứ Mệnh":["Tây","Tây Bắc","Tây Nam","Đông Bắc"],
  "Tây Tứ Mệnh":["Đông","Đông Nam","Nam","Bắc"]
};

const TU_HUNG = {
  1:{hoaHai:"Đông",nguQuy:"Nam",lucSat:"Đông Nam",tuyetMenh:"Bắc"},
  2:{hoaHai:"Tây Nam",nguQuy:"Đông Bắc",lucSat:"Tây",tuyetMenh:"Đông"},
  3:{hoaHai:"Đông",nguQuy:"Bắc",lucSat:"Đông Nam",tuyetMenh:"Nam"},
  4:{hoaHai:"Đông Nam",nguQuy:"Bắc",lucSat:"Đông",tuyetMenh:"Tây Nam"},
  5:{hoaHai:"Tây Nam",nguQuy:"Đông Bắc",lucSat:"Tây",tuyetMenh:"Đông"},
  6:{hoaHai:"Tây Bắc",nguQuy:"Tây Nam",lucSat:"Đông Bắc",tuyetMenh:"Đông"},
  7:{hoaHai:"Tây",nguQuy:"Đông Bắc",lucSat:"Tây Nam",tuyetMenh:"Bắc"},
  8:{hoaHai:"Đông Bắc",nguQuy:"Tây",lucSat:"Tây Bắc",tuyetMenh:"Đông Nam"},
  9:{hoaHai:"Bắc",nguQuy:"Đông Nam",lucSat:"Tây",tuyetMenh:"Tây Bắc"}
};

// Sinh birthData tự động cho 1950–2025
const birthData = {};
for (let year=1950;year<=2025;year++){
  const can=CAN[(year+6)%10], chi=CHI[(year+8)%12],
        canChi=`${can} ${chi}`,
        menhNguHanh=MENH_NGU_HANH[canChi]||"Chưa rõ";
  let sum=(year%100).toString().split("").map(Number).reduce((a,b)=>a+b,0);
  while(sum>9) sum=sum.toString().split("").map(Number).reduce((a,b)=>a+b,0);
  const cungNam=CUNG_PHI_NAM[sum], cungNu=CUNG_PHI_NU[sum],
        menhNam=["Cấn","Càn","Đoài","Khôn"].includes(cungNam)?"Tây Tứ Mệnh":"Đông Tứ Mệnh",
        menhNu=["Cấn","Càn","Đoài","Khôn"].includes(cungNu)?"Tây Tứ Mệnh":"Đông Tứ Mệnh";
  birthData[year]={name:canChi,menhNguHanh,quaiMenh:{nam:{cung:cungNam,menh:menhNam},nu:{cung:cungNu,menh:menhNu}},
    huongTotNam:H_TOT[menhNam],huongXauNam:H_XAU[menhNam],
    huongTotNu:H_TOT[menhNu],huongXauNu:H_XAU[menhNu]};
}

// Các hàm trợ giúp
function getYearFromDate(d){return new Date(d).getFullYear();}
function tinhKimLau(a,b){const t=b-a+1,d=t%9;let l="Không phạm Kim Lâu";if(d===1)l="Kim Lâu Thân";if(d===3)l="Kim Lâu Thê";if(d===6)l="Kim Lâu Tử";if(d===8)l="Kim Lâu Súc";return{tuoiAm:t,loai:l};}
function tinhHoangOc(a,b){const t=b-a+1,d=t%6,m={1:"Nhất Cát",2:"Nhì Nghi",3:"Tam Địa Sát",4:"Tứ Tấn Tài",5:"Ngũ Thọ Tử",0:"Lục Hoang Ốc"};return m[d];}
function tinhTamTai(a,b){const cs=CHI[(a+8)%12],cx=CHI[(b+8)%12],mp={"Thân":["Dần","Mão","Thìn"],"Tý":["Dần","Mão","Thìn"],"Thìn":["Dần","Mão","Thìn"],"Dậu":["Tỵ","Ngọ","Mùi"],"Sửu":["Tỵ","Ngọ","Mùi"],"Tỵ":["Tỵ","Ngọ","Mùi"],"Hợi":["Thân","Dậu","Tuất"],"Mão":["Thân","Dậu","Tuất"],"Mùi":["Thân","Dậu","Tuất"],"Ngọ":["Hợi","Tý","Sửu"],"Dần":["Hợi","Tý","Sửu"]};return mp[cs]?.includes(cx)||false;}
function danhGiaNgayTotXau(d){const cn=CHI[(new Date(d).getFullYear()+8)%12],ng=CHI[(new Date().getDate()+8)%12],x={"Tý":"Ngọ","Sửu":"Mùi","Dần":"Thân","Mão":"Dậu","Thìn":"Tuất","Tỵ":"Hợi","Ngọ":"Tý","Mùi":"Sửu","Thân":"Dần","Dậu":"Mão","Tuất":"Thìn","Hợi":"Tỵ"};return x[cn]===ng?`Ngày ${ng} xung tuổi ${cn}`:`Ngày ${ng} không xung tuổi ${cn}`;}
function xacDinhVan(y){return y>=2004&&y<=2023?8:y>=2024&&y<=2043?9:null;}
function phanTichHuyenKhong(d,y){const v=xacDinhVan(y);if(!v)return"Ngoài Vận 8–9";return v===8?`Vận 8 – ${d}: Phải hóa giải`:`Vận 9 – ${d}: Đại cát`;}
function kiemTraTheDat(o){const{hasSlope,slopeDirection,houseDirection,hasRoad,roadDirection,hasWater,waterDistance,hasHospital,hasTemple,hasChurch,hasCemetery}=o,v=[];if(hasSlope&&slopeDirection===houseDirection)v.push("Đất dốc cùng hướng nhà");if(hasRoad&&roadDirection===houseDirection)v.push("Đường đâm thẳng vào cửa");if(hasWater){if(waterDistance<5)v.push("Nước quá gần (<5m) trước cửa");else if(waterDistance>50)v.push("Thiếu thủy tụ (<50m) trước cửa");}if(hasHospital)v.push("Bệnh viện trước mặt");if(hasTemple)v.push("Chùa/đình/miếu trước cửa");if(hasChurch)v.push("Nhà thờ trước cửa");if(hasCemetery)v.push("Nghĩa địa trước mặt");return v.length?`<ul>${v.map(x=>`<li>⚠️ ${x}</li>`).join("")}</ul>`:`<p>✅ Môi trường xung quanh ổn định</p>`;}

document.getElementById("birthForm").addEventListener("submit",function(e){
  e.preventDefault();
  const bd=this.birthday.value,h=parseInt(this.hour.value),g=this.gender.value,y=parseInt(this.houseYear.value),d=this.houseDirection.value,
        hasSlope=this.hasSlope.checked,slopeDir=this.slopeDirection.value,hasRoad=this.hasRoadFacing.checked,roadDir=this.roadDirection.value,
        hasWater=this.hasWaterFront.checked,waterDist=parseFloat(this.waterDistance.value)||0,
        hasHospital=this.hasHospitalFront.checked,hasTemple=this.hasTempleFront.checked,hasChurch=this.hasChurchFront.checked,hasCemetery=this.hasCemeteryFront.checked,
        ns=getYearFromDate(bd),nx=new Date().getFullYear(),ccnam=`${CAN[(ns+6)%10]} ${CHI[(ns+8)%12]}`,gc=CHI[Math.floor(h/2)%12];
  let sum=(ns%100).toString().split("").map(Number).reduce((a,b)=>a+b,0);while(sum>9)sum=sum.toString().split("").map(Number).reduce((a,b)=>a+b,0);
  const cs=sum,cp=g==="nam"?CUNG_PHI_NAM[sum]:CUNG_PHI_NU[sum],birth=birthData[ns],info=birth.quaiMenh[g],
        kl=tinhKimLau(ns,nx),ho=tinhHoangOc(ns,nx),tt=tinhTamTai(ns,nx),dx=danhGiaNgayTotXau(bd),hk=phanTichHuyenKhong(d,y),
        ht=(g==="nam"?birth.huongTotNam:birth.huongTotNu).includes(d)?"✅ Hợp":"❌ Không hợp",
        th=TU_HUNG[cs],tr=kiemTraTheDat({hasSlope,slopeDirection:slopeDir,houseDirection:d,hasRoad,roadDirection:roadDir,hasWater,waterDistance:waterDist,hasHospital,hasTemple,hasChurch,hasCemetery});
  document.getElementById("result").innerHTML=\`
    <h2>Kết quả phân tích</h2>
    <p><strong>Can Chi:</strong> \${ccnam}</p>
    <p><strong>Giờ Chi:</strong> \${gc}</p>
    <p><strong>Mệnh ngũ hành:</strong> \${birth.menhNguHanh}</p>
    <p><strong>Quái mệnh:</strong> \${info.cung} – \${info.menh}</p>
    <p><strong>Hướng tốt:</strong> \${(g==="nam"?birth.huongTotNam:birth.huongTotNu).join(", ")}</p>
    <p><strong>Hướng chọn:</strong> \${d} → \${ht}</p>
    <hr>
    <h3>❗ Yếu tố phạm phong thủy</h3>
    <ul>
      <li><strong>Kim Lâu:</strong> \${kl.loai} (Tuổi âm: \${kl.tuoiAm})</li>
      <li><strong>Hoang Ốc:</strong> \${ho}</li>
      <li><strong>Tam Tai:</strong> \${tt?"⚠️ Phạm":"✅ Không phạm"}</li>
      <li><strong>Tứ Hung (quái \${cp}):</strong> Họa Hại–\${th.hoaHai}, Ngũ Quỷ–\${th.nguQuy}, Lục Sát–\${th.lucSat}, Tuyệt Mệnh–\${th.tuyetMenh}</li>
      <li><strong>Xung Chi:</strong> \${dx}</li>
    </ul>
    <hr>
    <h3>🌍 Thế đất & Môi trường</h3>
    \${tr}
    <hr>
    <p><strong>Huyền Không Phi Tinh:</strong> \${hk}</p>
  \`;
});
