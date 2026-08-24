const nodemailer=require("nodemailer");
const clean=(v,max=4000)=>String(v??"").replace(/[<>]/g,"").trim().slice(0,max);

module.exports=async(req,res)=>{
 if(req.method==="GET"){
  const keys=["SMTP_HOST","SMTP_PORT","SMTP_SECURE","SMTP_USER","SMTP_PASS","CONTACT_EMAIL"];
  return res.status(200).json({ok:true,service:"DellTech contacto API",environment:Object.fromEntries(keys.map(k=>[k,Boolean(process.env[k])]))});
 }
 if(req.method!=="POST"){res.setHeader("Allow","GET, POST");return res.status(405).json({ok:false,code:"METHOD_NOT_ALLOWED"});}
 try{
  const required=["SMTP_HOST","SMTP_PORT","SMTP_USER","SMTP_PASS"];
  const missing=required.filter(k=>!process.env[k]);
  if(missing.length)return res.status(500).json({ok:false,code:"MISSING_SMTP_ENV",missing});
  const b=req.body||{};
  const nombre=clean(b.nombre,120),telefono=clean(b.telefono,60),email=clean(b.email,180),equipo=clean(b.equipo,180),mensaje=clean(b.mensaje,4000);
  if(!nombre||!telefono||!email||!equipo||!mensaje)return res.status(400).json({ok:false,code:"INVALID_FORM_DATA"});
  const port=Number(process.env.SMTP_PORT||465);
  const secure=String(process.env.SMTP_SECURE??(port===465?"true":"false"))==="true";
  const transporter=nodemailer.createTransport({host:process.env.SMTP_HOST,port,secure,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});
  await transporter.verify();
  await transporter.sendMail({
    from:`"DellTech Alienware" <${process.env.SMTP_USER}>`,
    to:process.env.CONTACT_EMAIL||process.env.SMTP_USER,
    replyTo:email,
    subject:"Nueva consulta DellTech - informaticosmoncloa.com.es",
    text:`Nombre: ${nombre}\nTeléfono: ${telefono}\nEmail: ${email}\nEquipo: ${equipo}\n\nConsulta:\n${mensaje}`
  });
  return res.status(200).json({ok:true});
 }catch(error){
  console.error("DellTech SMTP error",{message:error?.message,code:error?.code,response:error?.response});
  return res.status(500).json({ok:false,code:"SMTP_SEND_FAILED",detail:error?.code||"UNKNOWN"});
 }
};