import React, { useState, useRef, useEffect } from "react";

// --- Themes ---
var THEMES = {
  studio:{name:"Studio Blue",icon:"🔵",vibe:"Bold, modern, confident",bg:"#EEF2FF",surface:"#FFFFFF",surface2:"#E0E7FF",border:"#C7D2FE",headerBg:"#1E3A8A",headerText:"#FFFFFF",headerSub:"#93C5FD",text:"#0F1D45",textSub:"#3B4E8C",textMuted:"#7B8CC4",accent:"#3B5BDB",accentText:"#FFFFFF",accentSub:"#E0E7FF",accentSubTxt:"#3B5BDB",green:"#0E7A5C",greenBg:"#D1FAE5",amber:"#A16207",amberBg:"#FEF3C7",red:"#B91C1C",redBg:"#FEE2E2",navActive:"#FFFFFF",navActiveTxt:"#1E3A8A",navInactive:"transparent",navInactiveTxt:"#93C5FD",navBorder:"#FFFFFF33",inp:"#FFFFFF",shadow:"rgba(59,91,219,0.08)"},
  arctic:{name:"Arctic Pro",icon:"❄",vibe:"Clean, clinical, focused",bg:"#F0F4F8",surface:"#FFFFFF",surface2:"#E8EEF4",border:"#D1DCE8",headerBg:"#FFFFFF",headerText:"#0F2137",headerSub:"#4A6380",text:"#0F2137",textSub:"#4A6380",textMuted:"#8BA3BC",accent:"#0062FF",accentText:"#FFFFFF",accentSub:"#E8F0FF",accentSubTxt:"#0062FF",green:"#00875A",greenBg:"#D1FAE5",amber:"#B45309",amberBg:"#FEF3C7",red:"#C0392B",redBg:"#FEE2E2",navActive:"#0062FF",navActiveTxt:"#FFFFFF",navInactive:"#F0F4F8",navInactiveTxt:"#4A6380",navBorder:"#D1DCE8",inp:"#FFFFFF",shadow:"rgba(0,98,255,0.07)"},
  chalk:{name:"Chalk & Slate",icon:"📝",vibe:"Warm, editorial, considered",bg:"#FAF7F2",surface:"#FFFFFF",surface2:"#F2EDE6",border:"#E0D8CE",headerBg:"#FFFFFF",headerText:"#1C1410",headerSub:"#5C4E42",text:"#1C1410",textSub:"#5C4E42",textMuted:"#9C8E82",accent:"#C84B31",accentText:"#FFFFFF",accentSub:"#FDEEE9",accentSubTxt:"#C84B31",green:"#2D7A4F",greenBg:"#D1FAE5",amber:"#B07D2A",amberBg:"#FEF3C7",red:"#C84B31",redBg:"#FDEEE9",navActive:"#1C1410",navActiveTxt:"#FAF7F2",navInactive:"#F2EDE6",navInactiveTxt:"#5C4E42",navBorder:"#E0D8CE",inp:"#FFFFFF",shadow:"rgba(200,75,49,0.07)"},
  greenhouse:{name:"Greenhouse",icon:"🌿",vibe:"Fresh, calm, science-forward",bg:"#F0FBF4",surface:"#FFFFFF",surface2:"#E4F5EA",border:"#C3E4CC",headerBg:"#FFFFFF",headerText:"#0C2618",headerSub:"#2D5C3F",text:"#0C2618",textSub:"#2D5C3F",textMuted:"#6A9E7F",accent:"#0F7B3D",accentText:"#FFFFFF",accentSub:"#E4F5EA",accentSubTxt:"#0F7B3D",green:"#0F7B3D",greenBg:"#D1FAE5",amber:"#A16207",amberBg:"#FEF3C7",red:"#B91C1C",redBg:"#FEE2E2",navActive:"#0F7B3D",navActiveTxt:"#FFFFFF",navInactive:"#F0FBF4",navInactiveTxt:"#2D5C3F",navBorder:"#C3E4CC",inp:"#FFFFFF",shadow:"rgba(15,123,61,0.07)"},
  graphite:{name:"Graphite & Gold",icon:"✨",vibe:"Premium, authoritative, refined",bg:"#F5F5F0",surface:"#FFFFFF",surface2:"#EEEEE8",border:"#DDDDD6",headerBg:"#1A1A16",headerText:"#FFFFFF",headerSub:"#A8A898",text:"#1A1A16",textSub:"#4A4A40",textMuted:"#8A8A7C",accent:"#B8962E",accentText:"#FFFFFF",accentSub:"#FBF5E6",accentSubTxt:"#7A5C0C",green:"#2E7D5C",greenBg:"#D1FAE5",amber:"#B8962E",amberBg:"#FEF9C3",red:"#B52C2C",redBg:"#FEE2E2",navActive:"#B8962E",navActiveTxt:"#FFFFFF",navInactive:"transparent",navInactiveTxt:"#A8A898",navBorder:"#B8962E44",inp:"#FFFFFF",shadow:"rgba(184,150,46,0.08)"},
};

// --- Constants ---
var CATS = {
  teaching:  {label:"Teaching",  icon:"⚗", color:"#0EA5E9"},
  leadership:{label:"Leadership",icon:"📋",color:"#8B5CF6"},
  pastoral:  {label:"Pastoral",  icon:"👤",color:"#EC4899"},
  admin:     {label:"Admin",     icon:"📁",color:"#F97316"},
  cpd:       {label:"CPD / Dev", icon:"📈",color:"#10B981"},
};
var PRIS = {
  urgent:{label:"Urgent",color:"#EF4444"},
  high:  {label:"High",  color:"#F97316"},
  medium:{label:"Medium",color:"#EAB308"},
  low:   {label:"Low",   color:"#22C55E"},
};
var WDAYS = [
  {key:"Mon",label:"Monday",   date:"2026-05-25"},
  {key:"Tue",label:"Tuesday",  date:"2026-05-26"},
  {key:"Wed",label:"Wednesday",date:"2026-05-27"},
  {key:"Thu",label:"Thursday", date:"2026-05-28"},
  {key:"Fri",label:"Friday",   date:"2026-05-29"},
];
var YEARS = ["Year 7","Year 8","Year 9","Year 10","Year 11","Year 12","Year 13"];
var MOODS = [{val:1,emoji:"😰",label:"Struggling"},{val:2,emoji:"😟",label:"Stressed"},{val:3,emoji:"😐",label:"Okay"},{val:4,emoji:"🙂",label:"Good"},{val:5,emoji:"😊",label:"Great"}];
var TODAY = new Date();
var POMO_SHORT = 5*60, POMO_LONG = 15*60;
var REC_LABELS = {weekly:"Weekly 🔁",fortnightly:"Fortnightly 🔁",halfTermly:"Half-termly 🔁"};

var AI_QS = [
  {label:"📧 Parent email",        prompt:"Draft a professional email to a parent about their child underperforming in Year 10 GCSE Chemistry. Warm but direct. Under 180 words."},
  {label:"📝 Observation feedback",prompt:"Write WWW/EBI observation feedback for a Year 9 atomic structure lesson. Strength: questioning technique. Development: differentiation."},
  {label:"📚 SOW update note",     prompt:"Write a rationale for updating the Year 8 Forces and Motion SOW to align with new AQA KS3 guidance. For the science team."},
  {label:"📣 Department memo",     prompt:"Draft a memo about Year 11 mock marking deadline, grade entry on tracker, and Wednesday 3:30pm meeting about intervention groups."},
  {label:"📊 Report comment",      prompt:"Write a 75-word GCSE report comment for a Year 10 B/C borderline student. Strong in practicals, struggles with extended writing. Include one revision tip."},
  {label:"🔬 Risk assessment",     prompt:"Write a risk assessment for Year 10 electrolysis of copper sulfate. Hazards, control measures, PPE. CLEAPSS-aligned format."},
];

// --- Generators ---
var GENS = {
  comms:{label:"Communications",icon:"🗨",color:"#0EA5E9",items:[
    {id:"parent_concern",title:"Parent Concern Email",desc:"Progress, behaviour or engagement concerns",saves:"~15 mins",fields:[{key:"student",label:"Student name",type:"text",ph:"e.g. James Patel"},{key:"year",label:"Year group",type:"select",opts:YEARS},{key:"concern",label:"Concern type",type:"select",opts:["Falling behind with work","Missing homework","Low effort","Behaviour in lessons","Exam preparation","Attendance"]},{key:"context",label:"Brief context",type:"textarea",ph:"e.g. Missed 3 homeworks, appears disengaged"}],build:function(f,n,s){return "Write a professional, warm parent email from "+(n||"the Head of Science")+(s?" at "+s:"")+". Student: "+(f.student||"[student]")+", "+(f.year||"[year]")+". Concern: "+(f.concern||"[concern]")+". Context: "+(f.context||"none")+". Under 180 words. Empathetic but direct. Clear next step. Open 'Dear Parent/Carer,' close 'Yours sincerely, "+(n||"[Name]")+", Head of Science'. Output only the email.";}},
    {id:"parent_praise",title:"Parent Praise Email",desc:"Celebrate a student achievement with their family",saves:"~10 mins",fields:[{key:"student",label:"Student name",type:"text",ph:"e.g. Aisha Khan"},{key:"year",label:"Year group",type:"select",opts:YEARS},{key:"achievement",label:"What have they done well?",type:"textarea",ph:"e.g. Outstanding Year 9 chemistry assessment result"}],build:function(f,n,s){return "Write a warm praise email from "+(n||"the Head of Science")+(s?" at "+s:"")+". Student: "+(f.student||"[student]")+", "+(f.year||"[year]")+". Achievement: "+(f.achievement||"[achievement]")+". Under 120 words. Specific, not generic. 'Dear Parent/Carer,' ... 'Yours sincerely, "+(n||"[Name]")+", Head of Science'. Output only the email.";}},
    {id:"praise_letter",title:"Praise Letter Home",desc:"Formal printed letter celebrating achievement",saves:"~15 mins",fields:[{key:"student",label:"Student name",type:"text",ph:"e.g. Thomas Wright"},{key:"year",label:"Year group",type:"select",opts:YEARS},{key:"achievement",label:"Achievement",type:"text",ph:"e.g. Top mark in Year 10 mock exam"},{key:"detail",label:"What made it stand out?",type:"textarea",ph:"e.g. Real improvement from previous test"}],build:function(f,n,s){return "Write a formal praise letter from "+(n||"the Head of Science")+(s?" at "+s:"")+". Student: "+(f.student||"[student]")+", "+(f.year||"[year]")+". Achievement: "+(f.achievement||"[achievement]")+". What stood out: "+(f.detail||"none")+". 2 paragraphs, Yours sincerely, "+(n||"[Name]")+", Head of Science. Under 150 words.";}},
    {id:"behaviour_writeup",title:"Behaviour Incident Write-up",desc:"Formal factual record of a behaviour incident",saves:"~20 mins",fields:[{key:"student",label:"Student name",type:"text",ph:"e.g. Jake Morrison"},{key:"year",label:"Year group",type:"select",opts:YEARS},{key:"date",label:"Date of incident",type:"text",ph:"e.g. 24 May 2026, period 3"},{key:"incident",label:"What happened?",type:"textarea",ph:"e.g. Refused instructions, used offensive language"}],build:function(f){return "Write a formal behaviour incident record. Student: "+(f.student||"[student]")+", "+(f.year||"[year]")+". Date: "+(f.date||"[date]")+". Incident: "+(f.incident||"[incident]")+". Third-person, factual, neutral. Include: description, immediate action, follow-up. Under 200 words.";}},
    {id:"class_update",title:"Whole-Class Parent Update",desc:"Mass communication for upcoming events or changes",saves:"~15 mins",fields:[{key:"year",label:"Year group",type:"select",opts:YEARS},{key:"topic",label:"Subject",type:"text",ph:"e.g. Upcoming GCSE mock exams"},{key:"points",label:"Key points",type:"textarea",ph:"e.g. Mocks 2-6 June, revision guides on Teams"}],build:function(f,n,s){return "Write a parent communication from "+(n||"Head of Science")+(s?" at "+s:"")+" to all parents of "+(f.year||"[year]")+" about: "+(f.topic||"[topic]")+". Key points: "+(f.points||"[points]")+". Under 200 words. 'Dear Parent/Carer,' ... 'Yours sincerely, "+(n||"[Name]")+", Head of Science'. Output only the letter.";}},
  ]},
  leadership:{label:"Leadership",icon:"📋",color:"#8B5CF6",items:[
    {id:"meeting_agenda",title:"Meeting Agenda",desc:"Department, line manager or faculty meeting",saves:"~20 mins",fields:[{key:"type",label:"Meeting type",type:"select",opts:["Department Meeting","Line Manager Meeting","Faculty Meeting","Curriculum Planning","Technician Briefing","Staff Briefing","SLT Update"]},{key:"date",label:"Date & time",type:"text",ph:"e.g. Wednesday 27 May, 3:30pm"},{key:"attendees",label:"Attendees",type:"text",ph:"e.g. All science staff"},{key:"topics",label:"Topics to cover",type:"textarea",ph:"One per line: Year 11 interventions, Mock marking deadlines"}],build:function(f){return "Create a professional meeting agenda. Type: "+(f.type||"[type]")+". Date/time: "+(f.date||"[date]")+". Attendees: "+(f.attendees||"[attendees]")+". Topics: "+(f.topics||"[topics]")+". Numbered items, time allocations, standard items (apologies, previous minutes, AOB, next meeting date). UK school format.";}},
    {id:"meeting_minutes",title:"Meeting Minutes",desc:"Turn rough notes into formal minutes",saves:"~30 mins",fields:[{key:"meeting",label:"Meeting name & date",type:"text",ph:"e.g. Science Dept Meeting, 27 May 2026"},{key:"attendees",label:"Attendees present",type:"text",ph:"e.g. J. Smith (Chair), A. Patel"},{key:"notes",label:"Your rough notes",type:"textarea",ph:"Paste your bullet-point notes here..."}],build:function(f){return "Convert these rough notes into formal meeting minutes. Meeting: "+(f.meeting||"[meeting]")+". Attendees: "+(f.attendees||"[attendees]")+". Notes: "+(f.notes||"[notes]")+". Numbered agenda items, decisions, ACTION: [person] assignments. Date of Next Meeting: TBC. UK school format.";}},
    {id:"dept_memo",title:"Department Memo",desc:"Staff communication on any topic",saves:"~15 mins",fields:[{key:"topic",label:"Memo subject",type:"text",ph:"e.g. Year 11 mock marking deadline"},{key:"audience",label:"Audience",type:"select",opts:["All Science Staff","KS3 Teaching Team","KS4 Teaching Team","KS5 Teaching Team","Science Technicians","Science & Maths Faculty"]},{key:"points",label:"Key points",type:"textarea",ph:"e.g. Deadline Friday 30 May, enter grades by 4pm"}],build:function(f,n){return "Write a professional department memo. FROM: "+(n||"Head of Science")+". TO: "+(f.audience||"[audience]")+". DATE: 24 May 2026. RE: "+(f.topic||"[topic]")+". Key points: "+(f.points||"[points]")+". Clear memo format, bullet points, action required. Under 200 words.";}},
    {id:"cover_lesson",title:"Cover Lesson Instructions",desc:"Instructions any cover supervisor can follow",saves:"~20 mins",fields:[{key:"year",label:"Year group",type:"select",opts:YEARS},{key:"topic",label:"Topic",type:"text",ph:"e.g. Cell biology"},{key:"where",label:"Where are they in the unit?",type:"text",ph:"e.g. Covered mitosis, now cell differentiation"},{key:"task",label:"Task for the lesson",type:"text",ph:"e.g. Complete revision worksheet p.34-36"}],build:function(f){return "Write cover lesson instructions for "+(f.year||"[year]")+" science. Topic: "+(f.topic||"[topic]")+". Where they are: "+(f.where||"[where]")+". Task: "+(f.task||"[task]")+". Cover supervisor has NO science knowledge. Include: objective, equipment, step-by-step instructions, early-finisher task, behaviour expectations. Numbered format.";}},
    {id:"appraisal_summary",title:"Staff Appraisal Summary",desc:"Draft appraisal write-up for performance management",saves:"~30 mins",fields:[{key:"staff",label:"Staff name & role",type:"text",ph:"e.g. J. Walsh, Science Teacher"},{key:"targets",label:"Agreed targets this year",type:"textarea",ph:"e.g. Improve Year 10 set 2 results, complete NPQ"},{key:"evidence",label:"Evidence and progress",type:"textarea",ph:"e.g. Y10 results up 8%, NPQ module 2 complete"}],build:function(f){return "Write a professional staff appraisal summary. Staff: "+(f.staff||"[staff]")+". Targets: "+(f.targets||"[targets]")+". Evidence: "+(f.evidence||"[evidence]")+". Progress against targets, commendations, development areas, next targets. Balanced HR language. Under 300 words.";}},
  ]},
  sciAdmin:{label:"Science Admin",icon:"⚗",color:"#10B981",items:[
    {id:"risk_assessment",title:"Risk Assessment",desc:"CLEAPSS-aligned practical risk assessment",saves:"~25 mins",fields:[{key:"practical",label:"Practical name",type:"text",ph:"e.g. Electrolysis of copper sulfate"},{key:"year",label:"Year group",type:"select",opts:YEARS},{key:"notes",label:"Notes / variations",type:"text",ph:"e.g. Large class, carbon electrodes available"}],build:function(f,n,s){return "Write a formal risk assessment for "+(f.practical||"[practical]")+", "+(f.year||"[year]")+(s?" at "+s:"")+". Notes: "+(f.notes||"none")+". Format: Hazard | Risk level | Who affected | Control measures | PPE | Emergency procedure. CLEAPSS-aligned. Include teacher prep note. Ready to file in department SOP.";}},
    {id:"tech_prep",title:"Lab Technician Prep List",desc:"Weekly formatted prep list for your technician",saves:"~20 mins",fields:[{key:"week",label:"Week of",type:"text",ph:"e.g. w/c 25 May 2026"},{key:"practicals",label:"List of practicals",type:"textarea",ph:"One per line: Mon - Year 9 Set 2 - Titration (30 students)"}],build:function(f){return "Create a lab technician prep list for week of "+(f.week||"[week]")+". Practicals: "+(f.practicals||"[practicals]")+". For each: day, year group, practical, equipment with quantities, chemicals, PPE, setup notes, safety reminders. Numbered weekly prep sheet.";}},
    {id:"sen_update",title:"SEN / EHCP Subject Update",desc:"Science contribution for an annual EHCP review",saves:"~25 mins",fields:[{key:"student",label:"Student name",type:"text",ph:"e.g. Emma Clarke"},{key:"year",label:"Year group",type:"select",opts:YEARS},{key:"needs",label:"Student SEND needs",type:"text",ph:"e.g. Dyslexia, processing difficulties"},{key:"performance",label:"Current performance",type:"textarea",ph:"e.g. Working at expected level, strong in practicals, struggles with extended writing"}],build:function(f){return "Write a science EHCP subject contribution for "+(f.student||"[student]")+", "+(f.year||"[year]")+". SEND needs: "+(f.needs||"[needs]")+". Performance: "+(f.performance||"[performance]")+". Include: attainment, progress, how SEND affects science learning, support in place, recommendations. Professional SEND language. Under 250 words.";}},
    {id:"practical_record",title:"Required Practical Record",desc:"Completion evidence record for Ofsted",saves:"~10 mins",fields:[{key:"practical",label:"Practical name",type:"text",ph:"e.g. AQA RP8 - Effect of temperature on enzyme activity"},{key:"class",label:"Year group & class",type:"text",ph:"e.g. Year 10, Set 2, 28 students"},{key:"date",label:"Date completed",type:"text",ph:"e.g. 22 May 2026"},{key:"notes",label:"Deviations or notes",type:"text",ph:"e.g. Used colorimetry due to colourblind student"}],build:function(f){return "Write a required practical completion record. Practical: "+(f.practical||"[practical]")+". Class: "+(f.class||"[class]")+". Date: "+(f.date||"[date]")+". Notes: "+(f.notes||"none")+". Include: practical reference, learning objectives, method summary, criteria met, deviations, teacher sign-off. Suitable for a department evidence file.";}},
  ]},
  dataReports:{label:"Data & Reports",icon:"📊",color:"#EC4899",items:[
    {id:"report_comment",title:"Report Comment",desc:"Individual student report within a word limit",saves:"~8 mins",fields:[{key:"student",label:"Student name",type:"text",ph:"e.g. Sophie Turner"},{key:"year",label:"Year group",type:"select",opts:YEARS},{key:"grade",label:"Current grade",type:"text",ph:"e.g. Grade 5"},{key:"strength",label:"Key strength",type:"text",ph:"e.g. Excellent practical skills"},{key:"target",label:"Area to develop",type:"text",ph:"e.g. Extended writing in exams"},{key:"words",label:"Word limit",type:"select",opts:["50 words","75 words","100 words","150 words"]}],build:function(f){return "Write a school report comment for "+(f.student||"[student]")+", "+(f.year||"[year]")+" science. Grade: "+(f.grade||"[grade]")+". Strength: "+(f.strength||"[strength]")+". Target: "+(f.target||"[target]")+". STRICT limit: "+(f.words||"75 words")+". Third person. Positive but honest. One specific actionable target. No cliches. Output only the comment.";}},
    {id:"data_commentary",title:"Data Commentary",desc:"Written analysis of cohort performance data",saves:"~25 mins",fields:[{key:"year",label:"Year group",type:"select",opts:YEARS},{key:"above",label:"% above expected",type:"text",ph:"e.g. 22"},{key:"onTrack",label:"% on track",type:"text",ph:"e.g. 55"},{key:"below",label:"% below expected",type:"text",ph:"e.g. 23"},{key:"context",label:"Context or factors",type:"text",ph:"e.g. High PP cohort, new teacher in spring"}],build:function(f){return "Write a data commentary for a science department review. "+(f.year||"[year]")+": "+(f.above||"?")+"\% above expected, "+(f.onTrack||"?")+"\% on track, "+(f.below||"?")+"\% below. Context: "+(f.context||"none")+". Include: headline summary, analysis, groups of concern, what is working, proposed interventions. Under 250 words.";}},
    {id:"exam_analysis",title:"Exam Analysis Write-up",desc:"Post-exam commentary for department meetings",saves:"~30 mins",fields:[{key:"exam",label:"Exam name",type:"text",ph:"e.g. Year 10 Chemistry unit test, May 2026"},{key:"average",label:"Class average",type:"text",ph:"e.g. 58%, average Grade 4"},{key:"strong",label:"Topics students did well on",type:"text",ph:"e.g. Atomic structure, balancing equations"},{key:"weak",label:"Topics students struggled with",type:"text",ph:"e.g. Moles calculations, extended writing"}],build:function(f){return "Write a post-exam analysis write-up. Exam: "+(f.exam||"[exam]")+". Average: "+(f.average||"[average]")+". Strong: "+(f.strong||"[strong]")+". Weak: "+(f.weak||"[weak]")+". Include: headline summary, analysis, reasons for weaknesses, reteaching priorities, department actions. Suitable for SLT. Under 300 words.";}},
    {id:"intervention_summary",title:"Intervention Group Summary",desc:"Formalise intervention plans for monitoring reviews",saves:"~20 mins",fields:[{key:"year",label:"Year group",type:"select",opts:YEARS},{key:"group",label:"Target group",type:"select",opts:["Below expected progress","Pupil Premium","SEND","High-ability","Boys underperforming","EAL students"]},{key:"students",label:"Students & notes",type:"textarea",ph:"One per line: James P - Grade 3, capable of 5"},{key:"strategy",label:"Planned intervention",type:"text",ph:"e.g. Weekly after-school, targeted questioning"}],build:function(f){return "Write a formal intervention group summary. Year: "+(f.year||"[year]")+". Group: "+(f.group||"[group]")+". Students: "+(f.students||"[students]")+". Strategy: "+(f.strategy||"[strategy]")+". Include: group overview, individual notes with targets, planned actions, timeline, success measures. Professional format.";}},
  ]},
  ofsted:{label:"Ofsted Ready",icon:"🏫",color:"#F97316",items:[
    {id:"sef_paragraph",title:"SEF Paragraph",desc:"Self-evaluation prose for any judgement area",saves:"~40 mins",fields:[{key:"area",label:"Judgement area",type:"select",opts:["Quality of Education","Leadership & Management","Personal Development","Behaviour & Attitudes","Curriculum Intent","Curriculum Implementation","Curriculum Impact","Sixth Form Provision"]},{key:"strengths",label:"Key strengths",type:"textarea",ph:"e.g. Sequenced curriculum, strong practical programme"},{key:"data",label:"Supporting data",type:"text",ph:"e.g. 78\% 4+, 42\% 7+, +0.3 progress"},{key:"actions",label:"Recent actions",type:"text",ph:"e.g. Revised KS3 SOW, retrieval practice CPD"}],build:function(f,n,s){return "Write a professional SEF paragraph for a UK secondary school science department"+(s?" at "+s:"")+". Area: "+(f.area||"[area]")+". Strengths: "+(f.strengths||"[strengths]")+". Data: "+(f.data||"[data]")+". Recent actions: "+(f.actions||"[actions]")+". First person plural. Confident Ofsted EIF language. Under 300 words. Flowing prose, no bullet points.";}},
    {id:"dip_update",title:"Improvement Plan Update",desc:"Progress update for a department improvement plan",saves:"~25 mins",fields:[{key:"action",label:"Improvement area",type:"text",ph:"e.g. Improve KS3 assessment consistency"},{key:"target",label:"Original success criteria",type:"text",ph:"e.g. All KS3 to common mark scheme by May 2026"},{key:"progress",label:"Progress made",type:"textarea",ph:"e.g. New mark schemes created, moderation in Oct and Mar"},{key:"impact",label:"Impact seen",type:"text",ph:"e.g. More consistent grades"},{key:"next",label:"Next steps",type:"text",ph:"e.g. Final moderation June"}],build:function(f){return "Write a formal department improvement plan update. Action: "+(f.action||"[action]")+". Target: "+(f.target||"[target]")+". Progress: "+(f.progress||"[progress]")+". Impact: "+(f.impact||"[impact]")+". Next steps: "+(f.next||"[next]")+". Include RAG status with justification. Professional monitoring language. Under 200 words.";}},
    {id:"monitoring_talking",title:"Monitoring Visit Talking Points",desc:"Structured notes for any monitoring conversation",saves:"~30 mins",fields:[{key:"type",label:"Visit type",type:"select",opts:["Book scrutiny","Learning walk","Data review","Curriculum review","Ofsted deep dive","Line manager review","Governor visit"]},{key:"achievements",label:"Key achievements",type:"textarea",ph:"e.g. Improved Year 11 outcomes, new KS3 curriculum"},{key:"context",label:"Important context",type:"text",ph:"e.g. New teacher in dept, high PP cohort"}],build:function(f){return "Create talking points for a Head of Science for a "+(f.type||"[visit type]")+". Achievements: "+(f.achievements||"[achievements]")+". Context: "+(f.context||"[context]")+". Structure: 1) Opening statement 2) Strengths with evidence 3) Contextual factors 4) Focus areas and actions 5) Closing. Bullet-pointed crib notes. Confident, evidence-referenced.";}},
    {id:"evidence_summary",title:"Subject Leader Evidence Summary",desc:"Evidence portfolio summary for any leadership area",saves:"~35 mins",fields:[{key:"area",label:"Evidence area",type:"text",ph:"e.g. Curriculum sequencing, Assessment practice"},{key:"evidence",label:"Your evidence points",type:"textarea",ph:"One per line: Revised KS3 SOW July 2025"},{key:"period",label:"Time period",type:"text",ph:"e.g. Academic year 2025-26"}],build:function(f){return "Write a professional subject leader evidence summary. Area: "+(f.area||"[area]")+". Period: "+(f.period||"[period]")+". Evidence: "+(f.evidence||"[evidence]")+". Organised summary with impact statements per evidence point. Introduction and overall effectiveness summary. Confident leadership language. Under 300 words.";}},
  ]},
};
var GEN_TABS = Object.keys(GENS).map(function(k){return {key:k,label:GENS[k].label,icon:GENS[k].icon,color:GENS[k].color,count:GENS[k].items.length};});

// --- Initial data ---
var INIT_TASKS = [
  {id:1, title:"Mark Year 11 mock papers",               category:"teaching",   priority:"urgent",dueDate:"2026-05-25",estimatedMins:90, done:false,notes:"Set 3 - 28 papers",                   scheduledDay:"Mon",recurring:null},
  {id:2, title:"Submit department development plan",      category:"leadership", priority:"high",  dueDate:"2026-05-27",estimatedMins:60, done:false,notes:"To DHT by end of week",               scheduledDay:"Wed",recurring:null},
  {id:3, title:"Prepare Y10 required practicals tracker", category:"teaching",   priority:"high",  dueDate:"2026-05-28",estimatedMins:45, done:false,notes:"",                                    scheduledDay:null, recurring:null},
  {id:4, title:"Staff appraisal - J. Walsh",             category:"pastoral",   priority:"medium",dueDate:"2026-05-29",estimatedMins:30, done:false,notes:"Prepare observation feedback",         scheduledDay:"Thu",recurring:null},
  {id:5, title:"Order lab consumables - Y9 titration",   category:"admin",      priority:"medium",dueDate:"2026-05-30",estimatedMins:15, done:false,notes:"Budget code: SCI-04",                 scheduledDay:null, recurring:null},
  {id:6, title:"Review new AQA spec changes",            category:"cpd",        priority:"low",   dueDate:"2026-06-05",estimatedMins:40, done:false,notes:"",                                    scheduledDay:null, recurring:null},
  {id:7, title:"Update SOW - Y7 Cells unit",             category:"teaching",   priority:"low",   dueDate:"2026-06-10",estimatedMins:60, done:false,notes:"",                                    scheduledDay:null, recurring:null},
  {id:8, title:"Weekly department briefing prep",         category:"leadership", priority:"medium",dueDate:"2026-05-25",estimatedMins:20, done:false,notes:"Set Monday agenda",                   scheduledDay:"Mon",recurring:"weekly"},
  {id:9, title:"Fortnightly book look - Year 10",         category:"teaching",   priority:"medium",dueDate:"2026-05-29",estimatedMins:45, done:false,notes:"Marking frequency + student response",scheduledDay:null, recurring:"fortnightly"},
  {id:10,title:"Half-termly data review",                 category:"leadership", priority:"high",  dueDate:"2026-06-12",estimatedMins:60, done:false,notes:"Progress data + intervention groups", scheduledDay:null, recurring:"halfTermly"},
];
var INIT_WB = {Mon:{hours:"",mood:null},Tue:{hours:"",mood:null},Wed:{hours:"",mood:null},Thu:{hours:"",mood:null},Fri:{hours:"",mood:null},Sat:{hours:"",mood:null},Sun:{hours:"",mood:null}};
var INIT_SETTINGS = {theme:"studio",name:"",school:"",specialism:"General Science",density:"comfortable",defaultView:"focus",workStart:"07:30",workEnd:"18:00",weekendProtection:true,pomoWork:25,pomoBreak:5,defaultPriority:"medium",defaultCategory:"teaching",defaultMins:30,termName:"Summer Term 2026",halfTerm:"2026-05-25",examStart:"2026-05-11",gcalUrl:"",examEnd:"2026-06-26"};

var INIT_MEETINGS = [
  {id:"mt1",name:"Department Meeting",day:"Mon",time:"15:30",frequency:"weekly",attendees:"All science staff",location:"Science office",color:"#8B5CF6"},
  {id:"mt2",name:"Line Manager Meeting",day:"Wed",time:"10:00",frequency:"fortnightly",attendees:"HoD + DHT",location:"DHT office",color:"#F97316"},
  {id:"mt3",name:"Technician Briefing",day:"Mon",time:"08:00",frequency:"weekly",attendees:"Science technicians",location:"Prep room",color:"#10B981"},
  {id:"mt4",name:"Faculty Meeting",day:"Thu",time:"15:30",frequency:"halfTermly",attendees:"Science & Maths faculty",location:"Conference room",color:"#0EA5E9"},
];
var INIT_AGENDA = {
  "mt1":[
    {id:"ag1",point:"Year 11 intervention groups - review progress data",source:"manual",addedDate:"2026-05-24",done:false,priority:"high"},
    {id:"ag2",point:"Mock marking deadline reminder - Friday 30 May, grades onto tracker by 4pm",source:"manual",addedDate:"2026-05-24",done:false,priority:"urgent"},
    {id:"ag3",point:"AQA spec update - brief team on key changes",source:"manual",addedDate:"2026-05-24",done:false,priority:"medium"},
  ],
  "mt2":[
    {id:"ag4",point:"Department development plan - progress update",source:"manual",addedDate:"2026-05-24",done:false,priority:"high"},
  ],
  "mt3":[
    {id:"ag5",point:"Year 9 titration - consumables order status check",source:"task",addedDate:"2026-05-24",done:false,priority:"medium"},
    {id:"ag6",point:"Upcoming required practicals for w/c 1 June",source:"manual",addedDate:"2026-05-24",done:false,priority:"medium"},
  ],
  "mt4":[],
};


// ─── Home Life ───────────────────────────────────────────────────────────────
var HOME_THEMES = {
  forest:{name:"Forest",icon:"🌿",vibe:"Calm, natural, grounding",bg:"#F4FBF0",surface:"#FFFFFF",surface2:"#E6F5DF",border:"#BCE5A8",headerBg:"#1A3A08",headerText:"#FFFFFF",headerSub:"#85C46A",text:"#0D2005",textSub:"#27500F",textMuted:"#6B9B52",accent:"#38860E",accentText:"#FFFFFF",accentSub:"#E6F5DF",accentSubTxt:"#38860E",green:"#38860E",greenBg:"#DCFCE7",amber:"#CA8A04",amberBg:"#FEF9C3",red:"#DC2626",redBg:"#FEE2E2",inp:"#FFFFFF",shadow:"rgba(56,134,14,0.09)",navActive:"#FFFFFF",navActiveTxt:"#1A3A08",navInactive:"transparent",navInactiveTxt:"#85C46A",navBorder:"#FFFFFF33"},
  sunset:{name:"Sunset",icon:"🌅",vibe:"Warm, cosy, inviting",bg:"#FFF8F0",surface:"#FFFFFF",surface2:"#FFF0E0",border:"#FFD4A8",headerBg:"#7A2E00",headerText:"#FFFFFF",headerSub:"#FFB47A",text:"#2D1200",textSub:"#7A3A00",textMuted:"#B87A40",accent:"#EA580C",accentText:"#FFFFFF",accentSub:"#FFF0E0",accentSubTxt:"#EA580C",green:"#16A34A",greenBg:"#DCFCE7",amber:"#B45309",amberBg:"#FEF3C7",red:"#DC2626",redBg:"#FEE2E2",inp:"#FFFFFF",shadow:"rgba(234,88,12,0.09)",navActive:"#FFFFFF",navActiveTxt:"#7A2E00",navInactive:"transparent",navInactiveTxt:"#FFB47A",navBorder:"#FFFFFF33"},
  ocean:{name:"Ocean",icon:"🌊",vibe:"Calm, clear, refreshing",bg:"#F0F8FF",surface:"#FFFFFF",surface2:"#E0F2FE",border:"#BAE6FD",headerBg:"#0C3050",headerText:"#FFFFFF",headerSub:"#7DD3FC",text:"#0C2340",textSub:"#1E4D7A",textMuted:"#5A8FAA",accent:"#0284C7",accentText:"#FFFFFF",accentSub:"#E0F2FE",accentSubTxt:"#0284C7",green:"#0E7A5C",greenBg:"#D1FAE5",amber:"#B45309",amberBg:"#FEF3C7",red:"#DC2626",redBg:"#FEE2E2",inp:"#FFFFFF",shadow:"rgba(2,132,199,0.09)",navActive:"#FFFFFF",navActiveTxt:"#0C3050",navInactive:"transparent",navInactiveTxt:"#7DD3FC",navBorder:"#FFFFFF33"},
  lavender:{name:"Lavender",icon:"💜",vibe:"Soft, creative, peaceful",bg:"#FAF5FF",surface:"#FFFFFF",surface2:"#F3E8FF",border:"#DDD6FE",headerBg:"#3B0764",headerText:"#FFFFFF",headerSub:"#C4B5FD",text:"#1E0B3A",textSub:"#4C1D95",textMuted:"#7C6FA8",accent:"#7C3AED",accentText:"#FFFFFF",accentSub:"#F3E8FF",accentSubTxt:"#7C3AED",green:"#059669",greenBg:"#D1FAE5",amber:"#D97706",amberBg:"#FEF3C7",red:"#DC2626",redBg:"#FEE2E2",inp:"#FFFFFF",shadow:"rgba(124,58,237,0.09)",navActive:"#FFFFFF",navActiveTxt:"#3B0764",navInactive:"transparent",navInactiveTxt:"#C4B5FD",navBorder:"#FFFFFF33"},
  rose:{name:"Rose",icon:"🌸",vibe:"Warm, gentle, caring",bg:"#FFF5F7",surface:"#FFFFFF",surface2:"#FFE4E8",border:"#FBCFE8",headerBg:"#7A0030",headerText:"#FFFFFF",headerSub:"#FDA4AF",text:"#2D0015",textSub:"#7A1030",textMuted:"#B87080",accent:"#E11D48",accentText:"#FFFFFF",accentSub:"#FFE4E8",accentSubTxt:"#E11D48",green:"#059669",greenBg:"#D1FAE5",amber:"#D97706",amberBg:"#FEF3C7",red:"#DC2626",redBg:"#FEE2E2",inp:"#FFFFFF",shadow:"rgba(225,29,72,0.09)",navActive:"#FFFFFF",navActiveTxt:"#7A0030",navInactive:"transparent",navInactiveTxt:"#FDA4AF",navBorder:"#FFFFFF33"},
};
var INIT_HOME_SETTINGS = {homeTheme:"forest",homeFont:"nunito"};

var CALENDAR_THEME = {
  name:"Calendar",bg:"#F8FAFC",surface:"#FFFFFF",surface2:"#F1F5F9",border:"#E2E8F0",
  headerBg:"#1E293B",headerText:"#FFFFFF",headerSub:"#94A3B8",
  text:"#0F172A",textSub:"#334155",textMuted:"#64748B",
  accent:"#475569",accentText:"#FFFFFF",accentSub:"#F1F5F9",accentSubTxt:"#334155",
  green:"#059669",greenBg:"#D1FAE5",amber:"#D97706",amberBg:"#FEF3C7",
  red:"#DC2626",redBg:"#FEE2E2",inp:"#FFFFFF",shadow:"rgba(71,85,105,0.08)",
  navActive:"#FFFFFF",navActiveTxt:"#1E293B",navInactive:"transparent",
  navInactiveTxt:"#94A3B8",navBorder:"#FFFFFF33",
};

var HOME_FONT_OPTIONS = {nunito:{name:"Nunito",label:"Rounded & friendly",css:"'Nunito',sans-serif"},inter:{name:"Inter",label:"Clean & modern",css:"'Inter',sans-serif"},lato:{name:"Lato",label:"Warm & humanist",css:"'Lato',sans-serif"}};

var INIT_FAMILY = [
  {id:"dad",name:"Tom",role:"Dad",color:"#3B5BDB"},
  {id:"mum",name:"",role:"Mum",color:"#EC4899"},
  {id:"c1",name:"",role:"Age 10",color:"#F97316"},
  {id:"c2",name:"",role:"Age 7",color:"#10B981"},
];

var INIT_CLUBS = [
  {id:"cl1",memberId:"dad",name:"Rugby Coaching",day:"Wed",time:"19:00",location:"St Ives RFC",costPerMonth:0,notes:"",frequency:"weekly",fortnightOffset:0,exceptions:[]},
  {id:"cl2",memberId:"c1",name:"Add activity",day:"Sat",time:"10:00",location:"",costPerMonth:0,notes:"",frequency:"weekly",fortnightOffset:0,exceptions:[]},
  {id:"cl3",memberId:"c2",name:"Add activity",day:"Tue",time:"17:30",location:"",costPerMonth:0,notes:"",frequency:"weekly",fortnightOffset:0,exceptions:[]},
];

var FIN_CATS = {housing:"Housing",utilities:"Utilities",food:"Food",transport:"Transport",children:"Children",insurance:"Insurance",subscriptions:"Subscriptions",other:"Other"};

var INIT_FINANCES = {
  monthlyIncome:0,
  items:[
    {id:"fi1",name:"Mortgage / Rent",amount:0,category:"housing",frequency:"monthly"},
    {id:"fi2",name:"Council Tax",amount:0,category:"housing",frequency:"monthly"},
    {id:"fi3",name:"Gas & Electric",amount:0,category:"utilities",frequency:"monthly"},
    {id:"fi4",name:"Water",amount:0,category:"utilities",frequency:"monthly"},
    {id:"fi5",name:"Broadband",amount:0,category:"utilities",frequency:"monthly"},
    {id:"fi6",name:"Mobile phones",amount:0,category:"utilities",frequency:"monthly"},
    {id:"fi7",name:"Food shopping",amount:400,category:"food",frequency:"monthly"},
    {id:"fi8",name:"Petrol / Transport",amount:0,category:"transport",frequency:"monthly"},
    {id:"fi9",name:"School clubs & activities",amount:0,category:"children",frequency:"monthly"},
    {id:"fi10",name:"Car insurance",amount:0,category:"insurance",frequency:"monthly"},
    {id:"fi11",name:"Home insurance",amount:0,category:"insurance",frequency:"monthly"},
    {id:"fi12",name:"Streaming / subscriptions",amount:0,category:"subscriptions",frequency:"monthly"},
  ],
  savingsGoals:[
    {id:"sg1",name:"Holiday fund",target:1500,current:0,color:"#F97316"},
    {id:"sg2",name:"Emergency fund",target:2000,current:0,color:"#EF4444"},
    {id:"sg3",name:"Christmas",target:500,current:0,color:"#10B981"},
  ],
};

var SHOP_CATS = ["fruit & veg","dairy","meat & fish","bakery","cupboard","frozen","drinks","household","other"];
var INIT_SHOPPING = [
  {id:"sp1",name:"Milk",category:"dairy",recurring:true,done:false},
  {id:"sp2",name:"Bread",category:"bakery",recurring:true,done:false},
  {id:"sp3",name:"Eggs",category:"dairy",recurring:true,done:false},
  {id:"sp4",name:"Butter",category:"dairy",recurring:true,done:false},
  {id:"sp5",name:"Bananas",category:"fruit & veg",recurring:true,done:false},
];
var MEAL_DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
var INIT_MEAL_PLAN = {Mon:"",Tue:"",Wed:"",Thu:"",Fri:"",Sat:"",Sun:""};

// ─── Timetable ────────────────────────────────────────────────────────────────
var PERIODS = [
  {id:"sep",short:"Separate",time:"08:00-08:45",type:"sep"},
  {id:"am", short:"AM Reg",  time:"08:50-09:05",type:"form"},
  {id:"p1", short:"Period 1",time:"09:05-10:15",type:"lesson"},
  {id:"p2", short:"Period 2",time:"10:35-11:45",type:"lesson"},
  {id:"p3", short:"Period 3",time:"11:50-13:00",type:"lesson"},
  {id:"pm", short:"PM Reg",  time:"13:00-13:30",type:"form"},
  {id:"p4", short:"Period 4",time:"14:05-15:15",type:"lesson"},
];

var CLASS_DEF = {
  form:    {color:"#16A34A",bg:"#DCFCE7",label:"Form 10TDH",   short:"Form"},
  "10Sc2": {color:"#2563EB",bg:"#DBEAFE",label:"Yr 10 Science",short:"Y10 Sci"},
  "9Sc1":  {color:"#0D9488",bg:"#CCFBF1",label:"Yr 9 Science", short:"Y9 Sci"},
  "11S1":  {color:"#D97706",bg:"#FEF3C7",label:"Yr 11 Science",short:"Y11 Sci"},
  "7M":    {color:"#0284C7",bg:"#E0F2FE",label:"Yr 7 Science", short:"Y7 Sci"},
  "8M":    {color:"#7C3AED",bg:"#EDE9FE",label:"Yr 8 Science", short:"Y8 Sci"},
  pshe:    {color:"#DB2777",bg:"#FCE7F3",label:"PSHE Yr 7",    short:"PSHE"},
  ppa:     {color:"#EA580C",bg:"#FFEDD5",label:"PPA",          short:"PPA"},
  inspired:{color:"#059669",bg:"#D1FAE5",label:"Be Inspired",  short:"Be Inspired"},
  reset:   {color:"#4F46E5",bg:"#EEF2FF",label:"Extended Reset",short:"Ext Reset"},
  sep:     {color:"#64748B",bg:"#F1F5F9",label:"Separate",     short:"Separate"},
};

var TT = {
  A:{
    Mon:{am:"f",p1:{c:"10Sc2",g:"10Sc2/S"},p2:{c:"ppa"},p3:{c:"11S1",g:"11S1/S"},pm:"f",p4:{c:"7M",g:"7M/S4"}},
    Tue:{sep:1,am:"f",p1:{c:"10Sc2",g:"10Sc2/S"},p2:{c:"9Sc1",g:"9Sc1/S"},p3:{c:"10Sc2",g:"10Sc2/S"},pm:"f",p4:{c:"ppa"}},
    Wed:{sep:1,am:"f",p1:{c:"ppa"},p2:{c:"11S1",g:"11S1/S"},p3:{c:"9Sc1",g:"9Sc1/S"},pm:"f",p4:{c:"ppa"}},
    Thu:{am:"f",p1:{c:"7M",g:"7M/S4"},p2:{c:"11S1",g:"11S1/S"},p3:{c:"ppa"},pm:"f",p4:{c:"7M",g:"7M/S4"}},
    Fri:{am:"f",p1:{c:"11S1",g:"11S1/S"},p2:{c:"ppa"},p3:{c:"8M",g:"8M/S4"},pm:"f",p4:{c:"9Sc1",g:"9Sc1/S"}},
  },
  B:{
    Mon:{am:"f",p1:{c:"7M",g:"7M/S4"},p2:{c:"pshe",g:"7S/GC"},p3:{c:"11S1",g:"11S1/S"},pm:"f",p4:{c:"10Sc2",g:"10Sc2/S"}},
    Tue:{sep:1,am:"f",p1:{c:"ppa"},p2:{c:"9Sc1",g:"9Sc1/S"},p3:{c:"11S1",g:"11S1/S"},pm:"f",p4:{c:"10Sc2",g:"10Sc2/S"}},
    Wed:{sep:1,am:"f",p1:{c:"9Sc1",g:"9Sc1/S"},p2:{c:"10Sc2",g:"10Sc2/S"},p3:{c:"ppa"},pm:"f",p4:{c:"10Sc2",g:"10Sc2/S"}},
    Thu:{am:"f",p1:{c:"8M",g:"8M/S4"},p2:{c:"11S1",g:"11S1/S"},p3:{c:"7M",g:"7M/S4"},pm:"f",p4:{c:"inspired",g:"Be Inspired"}},
    Fri:{am:"f",p1:{c:"7M",g:"7M/S4"},p2:{c:"ppa"},p3:{c:"9Sc1",g:"9Sc1/S"},pm:"f",p4:{c:"reset",g:"Ext. Reset"}},
  },
};

var SCHOOL_WEEKS = [
  {start:"2026-06-01",label:"01-05 Jun",type:"A",note:""},
  {start:"2026-06-08",label:"08-12 Jun",type:"B",note:""},
  {start:"2026-06-15",label:"15-19 Jun",type:"A",note:""},
  {start:"2026-06-22",label:"22-26 Jun",type:"B",note:""},
  {start:"2026-06-29",label:"29 Jun-03 Jul",type:"A",note:""},
  {start:"2026-07-06",label:"06-10 Jul",type:"B",note:"Be Inspired Activities Week"},
  {start:"2026-07-13",label:"13-17 Jul",type:"A",note:"Yr 7 & 11 Only (some days)"},
  {start:"2026-07-20",label:"20-24 Jul",type:"B",note:"Final week - ends Fri 24 Jul"},
];

var DAYS_ORDER = ["Mon","Tue","Wed","Thu","Fri"];
var DAYS_FULL = {Mon:"Monday",Tue:"Tuesday",Wed:"Wednesday",Thu:"Thursday",Fri:"Friday"};
var DAYS_OFFSET = {Mon:0,Tue:1,Wed:2,Thu:3,Fri:4};

var INIT_MEAL_FAVS = ["Spaghetti Bolognese","Chicken stir fry & rice","Homemade pizza","Fish fingers & chips","Jacket potatoes","Pasta bake","Chicken & sweet potato fries","Beans on toast","Omelette & salad","Sausage & mash","Soup & crusty bread","Tacos"];

var PERIODS=[
  {id:"amreg",label:"AM Reg",start:"08:50",end:"09:05",reg:true},
  {id:"p1",label:"Period 1",start:"09:05",end:"10:15",reg:false},
  {id:"p2",label:"Period 2",start:"10:35",end:"11:45",reg:false},
  {id:"p3",label:"Period 3",start:"11:50",end:"13:00",reg:false},
  {id:"pmreg",label:"PM Reg",start:"13:00",end:"13:30",reg:true},
  {id:"p4",label:"Period 4",start:"14:05",end:"15:15",reg:false},
];
var LC={
  form:{bg:"#DCFCE7",bd:"#16A34A",tx:"#14532D",name:"Form"},
  ppa:{bg:"#FEF3C7",bd:"#D97706",tx:"#92400E",name:"PPA"},
  free:{bg:"#F1F5F9",bd:"#94A3B8",tx:"#64748B",name:"Free"},
  yr7:{bg:"#EDE9FE",bd:"#7C3AED",tx:"#4C1D95",name:"Yr 7"},
  yr8:{bg:"#FCE7F3",bd:"#DB2777",tx:"#831843",name:"Yr 8"},
  yr9:{bg:"#CCFBF1",bd:"#0D9488",tx:"#134E4A",name:"Yr 9"},
  yr10:{bg:"#DBEAFE",bd:"#2563EB",tx:"#1E3A8A",name:"Yr 10"},
  yr11:{bg:"#E0E7FF",bd:"#4F46E5",tx:"#312E81",name:"Yr 11"},
  pshe:{bg:"#FDF4FF",bd:"#C026D3",tx:"#701A75",name:"PSHE"},
  inspired:{bg:"#FFF7ED",bd:"#EA580C",tx:"#7C2D12",name:"Special"},
};
var TT={
  A:{
    Mon:{amreg:{t:"form",l:"Form 10TDH"},p1:{t:"yr10",l:"Year 10",g:"10Sc2/S"},p2:{t:"ppa",l:"PPA"},p3:{t:"yr11",l:"Year 11",g:"11S1/S"},pmreg:{t:"form",l:"Form 10TDH"},p4:{t:"yr7",l:"Year 7",g:"7M/S4"}},
    Tue:{amreg:{t:"form",l:"Form 10TDH"},p1:{t:"yr10",l:"Year 10",g:"10Sc2/S"},p2:{t:"yr9",l:"Year 9",g:"9Sc1/S"},p3:{t:"yr10",l:"Year 10",g:"10Sc2/S"},pmreg:{t:"form",l:"Form 10TDH"},p4:{t:"ppa",l:"PPA"}},
    Wed:{amreg:{t:"form",l:"Form 10TDH"},p1:{t:"ppa",l:"PPA"},p2:{t:"yr11",l:"Year 11",g:"11S1/S"},p3:{t:"yr9",l:"Year 9",g:"9Sc1/S"},pmreg:{t:"form",l:"Form 10TDH"},p4:{t:"ppa",l:"PPA"}},
    Thu:{amreg:{t:"form",l:"Form 10TDH"},p1:{t:"yr7",l:"Year 7",g:"7M/S4"},p2:{t:"yr11",l:"Year 11",g:"11S1/S"},p3:{t:"ppa",l:"PPA"},pmreg:{t:"form",l:"Form 10TDH"},p4:{t:"yr7",l:"Year 7",g:"7M/S4"}},
    Fri:{amreg:{t:"form",l:"Form 10TDH"},p1:{t:"yr11",l:"Year 11",g:"11S1/S"},p2:{t:"ppa",l:"PPA"},p3:{t:"yr8",l:"Year 8",g:"8M/S4"},pmreg:{t:"form",l:"Form 10TDH"},p4:{t:"yr9",l:"Year 9",g:"9Sc1/S"}},
  },
  B:{
    Mon:{amreg:{t:"form",l:"Form 10TDH"},p1:{t:"yr7",l:"Year 7",g:"7M/S4"},p2:{t:"pshe",l:"PSHE Yr 7",g:"7S/GC"},p3:{t:"yr11",l:"Year 11",g:"11S1/S"},pmreg:{t:"form",l:"Form 10TDH"},p4:{t:"yr10",l:"Year 10",g:"10Sc2/S"}},
    Tue:{amreg:{t:"form",l:"Form 10TDH"},p1:{t:"ppa",l:"PPA"},p2:{t:"yr9",l:"Year 9",g:"9Sc1/S"},p3:{t:"yr11",l:"Year 11",g:"11S1/S"},pmreg:{t:"form",l:"Form 10TDH"},p4:{t:"yr10",l:"Year 10",g:"10Sc2/S"}},
    Wed:{amreg:{t:"form",l:"Form 10TDH"},p1:{t:"yr9",l:"Year 9",g:"9Sc1/S"},p2:{t:"yr10",l:"Year 10",g:"10Sc2/S"},p3:{t:"ppa",l:"PPA"},pmreg:{t:"form",l:"Form 10TDH"},p4:{t:"yr10",l:"Year 10",g:"10Sc2/S"}},
    Thu:{amreg:{t:"form",l:"Form 10TDH"},p1:{t:"yr8",l:"Year 8",g:"8M/S4"},p2:{t:"yr11",l:"Year 11",g:"11S1/S"},p3:{t:"yr7",l:"Year 7",g:"7M/S4"},pmreg:{t:"form",l:"Form 10TDH"},p4:{t:"inspired",l:"Be Inspired"}},
    Fri:{amreg:{t:"form",l:"Form 10TDH"},p1:{t:"yr7",l:"Year 7",g:"7M/S4"},p2:{t:"ppa",l:"PPA",n:"Science link meeting"},p3:{t:"yr9",l:"Year 9",g:"9Sc1/S"},pmreg:{t:"form",l:"Form 10TDH"},p4:{t:"inspired",l:"Extended Reset"}},
  },
};
var SCHOOL_WEEKS=[
  {wc:"2026-06-01",ab:"A",ends:"2026-06-05"},
  {wc:"2026-06-08",ab:"B",ends:"2026-06-12"},
  {wc:"2026-06-15",ab:"A",ends:"2026-06-19"},
  {wc:"2026-06-22",ab:"B",ends:"2026-06-26"},
  {wc:"2026-06-29",ab:"A",ends:"2026-07-03"},
  {wc:"2026-07-06",ab:"B",ends:"2026-07-10"},
  {wc:"2026-07-13",ab:"A",ends:"2026-07-17"},
  {wc:"2026-07-20",ab:"B",ends:"2026-07-24",note:"Last week of term - ends Fri 24 Jul"},
];
var TT_DAYS=["Mon","Tue","Wed","Thu","Fri"];
var TT_DAY_FULL={Mon:"Monday",Tue:"Tuesday",Wed:"Wednesday",Thu:"Thursday",Fri:"Friday"};
var TT_MONTHS=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


// --- Helpers ---
function daysUntil(ds){return Math.ceil((new Date(ds)-TODAY)/86400000);}
function formatDue(ds){var d=daysUntil(ds);if(d<0)return{text:"Overdue",color:"#EF4444"};if(d===0)return{text:"Today",color:"#EF4444"};if(d===1)return{text:"Tomorrow",color:"#F97316"};if(d<=3)return{text:d+" days",color:"#EAB308"};return{text:d+" days",color:"#64748B"};}
function scoreTask(t){var d=daysUntil(t.dueDate),p={urgent:100,high:70,medium:40,low:10}[t.priority];return p+(d<=0?200:d<=1?100:d<=3?50:d<=7?20:0);}
function addDays(ds,n){var d=new Date(ds);d.setDate(d.getDate()+n);return d.toISOString().split("T")[0];}
function mx(a,b){return Object.assign({},a,b);}

function playChime(done){
  try{var ctx=new(window.AudioContext||window.webkitAudioContext)();(done?[523,659,784,1047]:[784,659]).forEach(function(freq,i){var o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.value=freq;o.type="sine";var t=ctx.currentTime+i*0.18;g.gain.setValueAtTime(0.22,t);g.gain.exponentialRampToValueAtTime(0.001,t+0.4);o.start(t);o.stop(t+0.4);});}catch(e){}
}

// --- Timer circle ---
function CircleTimer(props){
  var timeLeft=props.timeLeft, totalTime=props.totalTime, mode=props.mode, th=props.th;
  var r=78, circ=2*Math.PI*r, prog=totalTime>0?timeLeft/totalTime:1, offset=circ*(1-prog);
  var cols={work:th.accent,break:th.green,longBreak:"#8B5CF6",idle:th.border};
  var col=cols[mode]||cols.idle;
  var mins=Math.floor(timeLeft/60), secs=timeLeft%60;
  var angle=prog*2*Math.PI-Math.PI/2;
  var labels={work:"FOCUS",break:"SHORT BREAK",longBreak:"LONG BREAK",idle:"READY"};
  return React.createElement("svg",{width:200,height:200,viewBox:"0 0 200 200",style:{overflow:"visible"}},
    React.createElement("circle",{cx:100,cy:100,r:r,fill:"none",stroke:th.border,strokeWidth:10}),
    React.createElement("circle",{cx:100,cy:100,r:r,fill:"none",stroke:col,strokeWidth:10,strokeLinecap:"round",strokeDasharray:circ,strokeDashoffset:offset,transform:"rotate(-90 100 100)",style:{transition:"stroke-dashoffset 0.95s linear,stroke 0.4s"}}),
    mode!=="idle"?React.createElement("circle",{cx:100+r*Math.cos(angle),cy:100+r*Math.sin(angle),r:7,fill:col,style:{filter:"drop-shadow(0 0 5px "+col+"88)"}}):null,
    React.createElement("text",{x:100,y:92,textAnchor:"middle",fill:th.text,fontSize:38,fontFamily:"'Syne',sans-serif",fontWeight:800,letterSpacing:-2},String(mins).padStart(2,"0")+":"+String(secs).padStart(2,"0")),
    React.createElement("text",{x:100,y:112,textAnchor:"middle",fill:col,fontSize:9,fontFamily:"'DM Mono',monospace",letterSpacing:3},labels[mode]||"READY")
  );
}

// --- Task chip ---
function TaskChip(props){
  var task=props.task, onToggle=props.onToggle, onUnschedule=props.onUnschedule, compact=props.compact, th=props.th;
  var cat=CATS[task.category];
  return (
    React.createElement("div",{style:{background:th.surface,border:"1px solid "+cat.color+"44",borderLeft:"3px solid "+cat.color,borderRadius:6,padding:compact?"5px 8px":"8px 12px",marginBottom:5,opacity:task.done?0.5:1,display:"flex",alignItems:"flex-start",gap:7}},
      React.createElement("button",{onClick:function(){onToggle(task.id);},style:{background:task.done?cat.color:"none",border:"2px solid "+cat.color,borderRadius:"50%",width:15,height:15,minWidth:15,marginTop:1,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:8,cursor:"pointer"}},task.done?"✓":""),
      React.createElement("div",{style:{flex:1,minWidth:0}},
        React.createElement("div",{style:{fontSize:compact?10:11,color:task.done?th.textMuted:th.text,fontFamily:"'Syne',sans-serif",fontWeight:600,lineHeight:1.3,textDecoration:task.done?"line-through":"none",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}},
          task.title, task.recurring?React.createElement("span",{style:{marginLeft:3,fontSize:8,color:th.accent}},"🔁"):null
        )
      ),
      onUnschedule?React.createElement("button",{onClick:function(){onUnschedule(task.id);},style:{background:"none",border:"none",color:th.textMuted,fontSize:11,cursor:"pointer",padding:0,lineHeight:1}},"x"):null
    )
  );
}

// --- Main App ---
export default function App(){
  var stT = useState(INIT_TASKS); var tasks=stT[0], setTasks=stT[1];
  var stV = useState("focus"); var view=stV[0], setView=stV[1];
  var stFC = useState("all"); var filterCat=stFC[0], setFilterCat=stFC[1];
  var stSD = useState(false); var showDone=stSD[0], setShowDone=stSD[1];
  var stEI = useState(null); var expandedId=stEI[0], setExpandedId=stEI[1];
  var stPD = useState(null); var planDrag=stPD[0], setPlanDrag=stPD[1];
  var stSt = useState(INIT_SETTINGS); var settings=stSt[0], setSettings=stSt[1];
  var stOS = useState(["appearance"]); var openSet=stOS[0], setOpenSet=stOS[1];
  var stDI = useState([]); var dumpItems=stDI[0], setDumpItems=stDI[1];
  var stDIn = useState(""); var dumpInput=stDIn[0], setDumpInput=stDIn[1];
  var stPo = useState({taskId:null,mode:"idle",timeLeft:25*60,totalTime:25*60,running:false,sessions:0,focusMins:0}); var pomo=stPo[0], setPomo=stPo[1];
  var timerRef = useRef(null);
  var stWb = useState(INIT_WB); var wb=stWb[0], setWb=stWb[1];
  var stRv = useState({wins:"",missed:"",next:""}); var review=stRv[0], setReview=stRv[1];
  var stAM = useState([{role:"assistant",content:"Hello! I am your Science HoD assistant. Use the quick-starts or type anything you need - emails, feedback, memos, SOW notes and more."}]); var aiMsgs=stAM[0], setAiMsgs=stAM[1];
  var stAI = useState(""); var aiInput=stAI[0], setAiInput=stAI[1];
  var stAL = useState(false); var aiLoading=stAL[0], setAiLoading=stAL[1];
  var stAC = useState(false); var aiCtx=stAC[0], setAiCtx=stAC[1];
  var chatRef = useRef(null);
  var stAT = useState("comms"); var autoTab=stAT[0], setAutoTab=stAT[1];
  var stSG = useState(null); var selGen=stSG[0], setSelGen=stSG[1];
  var stGF = useState({}); var genFields=stGF[0], setGenFields=stGF[1];
  var stGO = useState(""); var genOutput=stGO[0], setGenOutput=stGO[1];
  var stGL = useState(false); var genLoading=stGL[0], setGenLoading=stGL[1];
  var stCP = useState(false); var copied=stCP[0], setCopied=stCP[1];
  var stCG = useState({comms:[],leadership:[],sciAdmin:[],dataReports:[],ofsted:[]}); var customGens=stCG[0], setCustomGens=stCG[1];
  var stSS = useState(false); var showSuggest=stSS[0], setShowSuggest=stSS[1];
  var stSIn = useState(""); var suggestInput=stSIn[0], setSuggestInput=stSIn[1];
  var stSC = useState("comms"); var suggestCat=stSC[0], setSuggestCat=stSC[1];
  var stSL = useState(false); var suggestLoading=stSL[0], setSuggestLoading=stSL[1];
  var stSR = useState(null); var suggestResult=stSR[0], setSuggestResult=stSR[1];
  var stNT = useState({title:"",category:"teaching",priority:"medium",dueDate:"",estimatedMins:30,notes:"",recurring:null}); var newTask=stNT[0], setNewTask=stNT[1];
  // Email paste-and-process state
  var stETx = useState(""); var emailText=stETx[0], setEmailText=stETx[1];
  var stESn = useState(""); var emailSender=stESn[0], setEmailSender=stESn[1];
  var stESj = useState(""); var emailSubject=stESj[0], setEmailSubject=stESj[1];
  var stEFi = useState([]); var emailFiles=stEFi[0], setEmailFiles=stEFi[1];
  var stEPr = useState(false); var emailProcessing=stEPr[0], setEmailProcessing=stEPr[1];
  var stERes = useState(null); var emailResult=stERes[0], setEmailResult=stERes[1];
  var stERc = useState(false); var emailReplyCopied=stERc[0], setEmailReplyCopied=stERc[1];
  var stEDrag = useState(false); var emailDragging=stEDrag[0], setEmailDragging=stEDrag[1];
  // Meetings state
  var stMt = useState(INIT_MEETINGS); var meetings=stMt[0], setMeetings=stMt[1];
  var stAg = useState(INIT_AGENDA); var agenda=stAg[0], setAgenda=stAg[1];
  var stSelMt = useState("mt1"); var selMtId=stSelMt[0], setSelMtId=stSelMt[1];
  var stNewAg = useState(""); var newAgPoint=stNewAg[0], setNewAgPoint=stNewAg[1];
  var stNewAgPri = useState("medium"); var newAgPri=stNewAgPri[0], setNewAgPri=stNewAgPri[1];
  var stAgGen = useState(false); var agendaGenLoading=stAgGen[0], setAgendaGenLoading=stAgGen[1];
  var stAgOut = useState(""); var agendaOutput=stAgOut[0], setAgendaOutput=stAgOut[1];
  var stAgCop = useState(false); var agendaCopied=stAgCop[0], setAgendaCopied=stAgCop[1];
  var stCalLoad = useState(false); var calLoading=stCalLoad[0], setCalLoading=stCalLoad[1];
  var stCalMsg = useState(""); var calMsg=stCalMsg[0], setCalMsg=stCalMsg[1];
  var stAddMtg = useState(false); var showAddMeeting=stAddMtg[0], setShowAddMeeting=stAddMtg[1];
  var stNewMtg = useState({name:"",day:"Mon",time:"15:30",frequency:"weekly",attendees:"",location:"",color:"#8B5CF6"}); var newMtg=stNewMtg[0], setNewMtg=stNewMtg[1];
  var stAddToMtg = useState(null); var addToMtgPoint=stAddToMtg[0], setAddToMtgPoint=stAddToMtg[1];
  // ─── Home Life state ───────────────────────────────────────────────────────
  var stAppMode = useState("work"); var appMode=stAppMode[0], setAppMode=stAppMode[1];
  var stFam = useState(INIT_FAMILY); var family=stFam[0], setFamily=stFam[1];
  var stClubs = useState(INIT_CLUBS); var clubs=stClubs[0], setClubs=stClubs[1];
  var stFin = useState(INIT_FINANCES); var finances=stFin[0], setFinances=stFin[1];
  var stMealPlan = useState(INIT_MEAL_PLAN); var mealPlan=stMealPlan[0], setMealPlan=stMealPlan[1];
  var stMealFavs = useState(INIT_MEAL_FAVS); var mealFavs=stMealFavs[0], setMealFavs=stMealFavs[1];
  var stShopList = useState(INIT_SHOPPING); var shoppingList=stShopList[0], setShoppingList=stShopList[1];
  var stClubFilter = useState("all"); var clubFilter=stClubFilter[0], setClubFilter=stClubFilter[1];
  var stShowAddClub = useState(false); var showAddClub=stShowAddClub[0], setShowAddClub=stShowAddClub[1];
  var stNewClub = useState({memberId:"dad",name:"",day:"Mon",time:"17:00",location:"",costPerMonth:0,notes:"",frequency:"weekly",fortnightOffset:0,exceptions:[]}); var newClub=stNewClub[0], setNewClub=stNewClub[1];
  var stEditClub = useState(null); var editClub=stEditClub[0], setEditClub=stEditClub[1];
  var stNewFav = useState(""); var newFav=stNewFav[0], setNewFav=stNewFav[1];
  var stShowAddFin = useState(false); var showAddFin=stShowAddFin[0], setShowAddFin=stShowAddFin[1];
  var stNewFin = useState({name:"",amount:0,category:"other",frequency:"monthly"}); var newFin=stNewFin[0], setNewFin=stNewFin[1];
  var stFinPriv = useState(true); var finPrivate=stFinPriv[0], setFinPrivate=stFinPriv[1];
  var stMealTab = useState("plan"); var mealTab=stMealTab[0], setMealTab=stMealTab[1];
  var stMealLoad = useState(false); var mealLoading=stMealLoad[0], setMealLoading=stMealLoad[1];
  var stMealSug = useState(""); var mealSugg=stMealSug[0], setMealSugg=stMealSug[1];
  var stShopFilter = useState("all"); var shopFilter=stShopFilter[0], setShopFilter=stShopFilter[1];
  // Timetable state
  var stTTWk = useState(0); var ttWeekIdx=stTTWk[0], setTTWeekIdx=stTTWk[1];
  var stTTDay = useState("Mon"); var ttDay=stTTDay[0], setTTDay=stTTDay[1];
  // Edit / delete / recurring modal state
  var stEditTask = useState(null); var editTask=stEditTask[0], setEditTask=stEditTask[1];
  var stRecModal = useState(null); var recModal=stRecModal[0], setRecModal=stRecModal[1];
  var stEditAgPt = useState(null); var editAgPt=stEditAgPt[0], setEditAgPt=stEditAgPt[1];
  // Voice input
  var stVoiceField = useState(null); var voiceField=stVoiceField[0], setVoiceField=stVoiceField[1];
  var stVoiceOn = useState(false); var voiceOn=stVoiceOn[0], setVoiceOn=stVoiceOn[1];
  var voiceRecRef = useRef(null);
  // Storage loaded flag
  var stLoaded = useState(false); var loaded=stLoaded[0], setLoaded=stLoaded[1];
  var stGcal = useState([]); var gcalEvents=stGcal[0], setGcalEvents=stGcal[1];
  var stGcalLoading = useState(false); var gcalLoading=stGcalLoading[0], setGcalLoading=stGcalLoading[1];
  var stGcalErr = useState(""); var gcalErr=stGcalErr[0], setGcalErr=stGcalErr[1];
  var stNewShop = useState(""); var newShopItem=stNewShop[0], setNewShopItem=stNewShop[1];
  var stNewShopCat = useState("other"); var newShopCat=stNewShopCat[0], setNewShopCat=stNewShopCat[1];
  var stFamEdit = useState(false); var showFamEdit=stFamEdit[0], setShowFamEdit=stFamEdit[1];
  var stTtWk = useState(0); var ttWeek=stTtWk[0], setTtWeek=stTtWk[1];
  var stHSet = useState(INIT_HOME_SETTINGS); var homeSettings=stHSet[0], setHomeSettings=stHSet[1];
  var stOpenHS = useState(["h-appearance"]); var openHomeSet=stOpenHS[0], setOpenHomeSet=stOpenHS[1];
  var stCalPg = useState(0); var calPage=stCalPg[0], setCalPage=stCalPg[1];
  var stCalSel = useState("2026-06-01"); var calSel=stCalSel[0], setCalSel=stCalSel[1];
  var stCalFlt = useState("all"); var calFilter=stCalFlt[0], setCalFilter=stCalFlt[1];
  var stCalEvts = useState([]); var calEvents2=stCalEvts[0], setCalEvents2=stCalEvts[1];
  var stShowAddEv = useState(false); var showAddEv=stShowAddEv[0], setShowAddEv=stShowAddEv[1];
  var stNewEv = useState({title:"",date:"",time:"",type:"work",notes:""}); var newEv=stNewEv[0], setNewEv=stNewEv[1];
  var stEditEv = useState(null); var editEv=stEditEv[0], setEditEv=stEditEv[1];
  var outputRef=useRef(null), suggestRef=useRef(null);

  var th = appMode==="home" ? (HOME_THEMES[homeSettings.homeTheme]||HOME_THEMES.forest) : appMode==="cal" ? CALENDAR_THEME : (THEMES[settings.theme]||THEMES.studio);
  var POMO_WORK = settings.pomoWork * 60;

  useEffect(function(){if(chatRef.current)chatRef.current.scrollIntoView({behavior:"smooth"});},[aiMsgs]);
  useEffect(function(){if(genOutput&&outputRef.current)outputRef.current.scrollIntoView({behavior:"smooth",block:"nearest"});},[genOutput]);
  useEffect(function(){if(suggestResult&&suggestRef.current)suggestRef.current.scrollIntoView({behavior:"smooth",block:"nearest"});},[suggestResult]);


  // Persistence: load on mount
  useEffect(function(){
    async function loadAll(){
      var keys=["hod-tasks","hod-settings","hod-meetings","hod-agenda","hod-wb","hod-review",
                "hod-home-settings","hod-family","hod-clubs","hod-finances","hod-meal-plan",
                "hod-meal-favs","hod-shopping","hod-cal-events"];
      var setters=[setTasks,setSettings,setMeetings,setAgenda,setWb,setReview,
                   setHomeSettings,setFamily,setClubs,setFinances,setMealPlan,
                   setMealFavs,setShoppingList,setCalEvents2];
      for(var i=0;i<keys.length;i++){
        try{var r=await window.storage.get(keys[i]);if(r&&r.value)setters[i](JSON.parse(r.value));}catch(e){}
      }
      setLoaded(true);
    }
    loadAll();
  },[]);

  // Persistence: auto-save on change
  useEffect(function(){if(loaded)window.storage.set("hod-tasks",JSON.stringify(tasks)).catch(function(){});},[tasks,loaded]);
  useEffect(function(){if(loaded)window.storage.set("hod-settings",JSON.stringify(settings)).catch(function(){});},[settings,loaded]);
  useEffect(function(){if(loaded)window.storage.set("hod-meetings",JSON.stringify(meetings)).catch(function(){});},[meetings,loaded]);
  useEffect(function(){if(loaded)window.storage.set("hod-agenda",JSON.stringify(agenda)).catch(function(){});},[agenda,loaded]);
  useEffect(function(){if(loaded)window.storage.set("hod-wb",JSON.stringify(wb)).catch(function(){});},[wb,loaded]);
  useEffect(function(){if(loaded)window.storage.set("hod-review",JSON.stringify(review)).catch(function(){});},[review,loaded]);
  useEffect(function(){if(loaded)window.storage.set("hod-home-settings",JSON.stringify(homeSettings)).catch(function(){});},[homeSettings,loaded]);
  useEffect(function(){if(loaded)window.storage.set("hod-family",JSON.stringify(family)).catch(function(){});},[family,loaded]);
  useEffect(function(){if(loaded)window.storage.set("hod-clubs",JSON.stringify(clubs)).catch(function(){});},[clubs,loaded]);
  useEffect(function(){if(loaded)window.storage.set("hod-finances",JSON.stringify(finances)).catch(function(){});},[finances,loaded]);
  useEffect(function(){if(loaded)window.storage.set("hod-meal-plan",JSON.stringify(mealPlan)).catch(function(){});},[mealPlan,loaded]);
  useEffect(function(){if(loaded)window.storage.set("hod-meal-favs",JSON.stringify(mealFavs)).catch(function(){});},[mealFavs,loaded]);
  useEffect(function(){if(loaded)window.storage.set("hod-shopping",JSON.stringify(shoppingList)).catch(function(){});},[shoppingList,loaded]);
  useEffect(function(){if(loaded)window.storage.set("hod-cal-events",JSON.stringify(calEvents2)).catch(function(){});},[calEvents2,loaded]);

  useEffect(function(){
    var POMO_BR = settings.pomoBreak * 60;
    if(pomo.running){
      timerRef.current = setInterval(function(){
        setPomo(function(p){
          if(p.timeLeft<=1){
            clearInterval(timerRef.current);
            if(p.mode==="work"){var s=p.sessions+1,iL=s%4===0;playChime(true);return Object.assign({},p,{running:false,mode:iL?"longBreak":"break",timeLeft:iL?15*60:POMO_BR,totalTime:iL?15*60:POMO_BR,sessions:s,focusMins:p.focusMins+settings.pomoWork});}
            else{playChime(false);return Object.assign({},p,{running:false,mode:"work",timeLeft:POMO_WORK,totalTime:POMO_WORK});}
          }
          return Object.assign({},p,{timeLeft:p.timeLeft-1});
        });
      },1000);
    } else { clearInterval(timerRef.current); }
    return function(){clearInterval(timerRef.current);};
  },[pomo.running,settings.pomoWork,settings.pomoBreak]);

  function setSt(key,val){setSettings(function(s){return Object.assign({},s,{[key]:val});});}
  function toggleSet(key){setOpenSet(function(o){return o.includes(key)?o.filter(function(k){return k!==key;}):[...o,key];});}

  function toggleDone(id){
    setTasks(function(ts){
      return ts.map(function(t){
        if(t.id!==id)return t;
        var nd=!t.done;
        if(nd&&t.recurring){
          var days={weekly:7,fortnightly:14,halfTermly:42}[t.recurring]||7;
          var gid=t.recurringGroupId||t.id;
          setTimeout(function(){setTasks(function(p){return p.concat([Object.assign({},t,{id:Date.now(),done:false,dueDate:addDays(t.dueDate,days),scheduledDay:null,recurringGroupId:gid})]);});},30);
        }
        return Object.assign({},t,{done:nd});
      });
    });
  }
  function saveEditTask(){
    if(!editTask||!editTask.title.trim()||!editTask.dueDate)return;
    setTasks(function(ts){return ts.map(function(t){return t.id===editTask.id?Object.assign({},editTask):t;});});
    setEditTask(null);
  }
  function requestDeleteTask(task){
    if(task.recurringGroupId){
      setRecModal({type:"delete",task:task});
    } else {
      deleteTask(task.id);
    }
  }
  function requestEditTask(task){
    if(task.recurringGroupId){
      setRecModal({type:"edit",task:task});
    } else {
      setEditTask(Object.assign({},task));
    }
  }
  function handleRecurringChoice(choice){
    if(!recModal)return;
    if(recModal.type==="delete"){
      if(choice==="all"){
        var gid=recModal.task.recurringGroupId;
        setTasks(function(ts){return ts.filter(function(t){return t.recurringGroupId!==gid&&t.id!==recModal.task.id;});});
      } else {
        deleteTask(recModal.task.id);
      }
    } else if(recModal.type==="edit"){
      if(choice==="all"){
        setEditTask(Object.assign({},recModal.task,{_editAll:true}));
      } else {
        setEditTask(Object.assign({},recModal.task,{_editAll:false}));
      }
    }
    setRecModal(null);
  }
  function saveEditTaskFinal(){
    if(!editTask||!editTask.title.trim()||!editTask.dueDate)return;
    if(editTask._editAll&&editTask.recurringGroupId){
      var gid=editTask.recurringGroupId;
      var upd=Object.assign({},editTask);
      delete upd._editAll;
      setTasks(function(ts){return ts.map(function(t){
        if(t.recurringGroupId===gid||t.id===upd.id){
          return Object.assign({},t,{title:upd.title,category:upd.category,priority:upd.priority,estimatedMins:upd.estimatedMins,notes:upd.notes});
        }
        return t;
      });});
    } else {
      var upd2=Object.assign({},editTask);
      delete upd2._editAll;
      setTasks(function(ts){return ts.map(function(t){return t.id===upd2.id?upd2:t;});});
    }
    setEditTask(null);
  }
  function deleteTask(id){setTasks(function(ts){return ts.filter(function(t){return t.id!==id;});});}
  function scheduleTask(id,day){setTasks(function(ts){return ts.map(function(t){return t.id===id?Object.assign({},t,{scheduledDay:day}):t;});});}
  function unscheduleTask(id){setTasks(function(ts){return ts.map(function(t){return t.id===id?Object.assign({},t,{scheduledDay:null}):t;});});}
  function addTask(){
    if(!newTask.title.trim()||!newTask.dueDate)return;
    var gid=newTask.recurring?Date.now():null;
    setTasks(function(ts){return ts.concat([Object.assign({},newTask,{id:Date.now(),done:false,scheduledDay:null,recurringGroupId:gid})]);});
    setNewTask({title:"",category:settings.defaultCategory,priority:settings.defaultPriority,dueDate:"",estimatedMins:settings.defaultMins,notes:"",recurring:null});
    setView("all");
  }
  function addDump(){if(!dumpInput.trim())return;setDumpItems(function(d){return d.concat([{id:Date.now(),text:dumpInput.trim(),ts:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}]);});setDumpInput("");}
  function startVoice(setter,fieldId){
    try{
      var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
      if(!SR){alert("Voice input works in Chrome. Please use Chrome for this feature.");return;}
      if(voiceRecRef.current){try{voiceRecRef.current.stop();}catch(e){}}
      var rec=new SR();
      rec.lang="en-GB";
      rec.continuous=false;
      rec.interimResults=false;
      rec.onstart=function(){setVoiceField(fieldId);setVoiceOn(true);};
      rec.onresult=function(e){
        var transcript=e.results[0][0].transcript;
        setter(function(prev){return (prev?prev+" ":"")+transcript;});
        setVoiceOn(false);setVoiceField(null);
      };
      rec.onerror=function(){setVoiceOn(false);setVoiceField(null);};
      rec.onend=function(){setVoiceOn(false);};
      voiceRecRef.current=rec;
      rec.start();
    }catch(e){setVoiceOn(false);setVoiceField(null);alert("Voice input not available.");}
  }
  function MicBtn(setter,fieldId){
    var isActive=voiceOn&&voiceField===fieldId;
    return React.createElement("button",{
      type:"button",
      onClick:function(){startVoice(setter,fieldId);},
      title:"Speak to fill this field (Chrome only)",
      style:{background:isActive?"#EF4444":th.surface2,border:"1px solid "+(isActive?"#EF4444":th.border),borderRadius:7,width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,transition:"all 0.2s",boxShadow:isActive?"0 0 0 3px #EF444433":"none"}
    },isActive?React.createElement("span",{style:{width:10,height:10,borderRadius:"50%",background:"#EF4444",animation:"pp 1s infinite",display:"block"}}):React.createElement("span",{style:{fontSize:14}},"🎙"));
  }
  function dumpToTask(item){setNewTask({title:item.text,category:settings.defaultCategory,priority:settings.defaultPriority,dueDate:"",estimatedMins:settings.defaultMins,notes:"",recurring:null});setDumpItems(function(d){return d.filter(function(x){return x.id!==item.id;});});setView("add");}

  async function sendAI(text){
    if(!text.trim())return;
    var ctx2=aiCtx?"\n\n[Tasks: "+tasks.filter(function(t){return !t.done;}).map(function(t){return '"'+t.title+'"('+t.category+','+t.priority+',due '+t.dueDate+')';}).join("; ")+"]":"";
    var msg={role:"user",content:text+ctx2};
    var hist=aiMsgs.concat([msg]);
    setAiMsgs(hist);setAiInput("");setAiLoading(true);
    try{
      var r=await fetch("https://hod-proxy.t-d-haycock.workers.dev",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:1000,system:"You are a specialist assistant for "+(settings.name||"a Head of Science")+" at "+(settings.school||"a UK secondary school")+". Help draft professional communications, teaching documents, department admin and leadership tasks. UK English. Concise and practical. Ready-to-use text.",messages:hist.map(function(m){return {role:m.role,content:m.content};})})});
      var data=await r.json();
      var reply=(data.content&&data.content.find(function(b){return b.type==="text";}))||{text:"Sorry, could not generate a response."};
      setAiMsgs(function(prev){return prev.concat([{role:"assistant",content:reply.text}]);});
    }catch(e){setAiMsgs(function(prev){return prev.concat([{role:"assistant",content:"Could not connect - please check your connection and try again."}]);});}
    setAiLoading(false);
  }

  function selectGen(gen){if(selGen&&selGen.id===gen.id){setSelGen(null);setGenFields({});setGenOutput("");}else{setSelGen(gen);setGenFields({});setGenOutput("");setCopied(false);}}
  async function runGen(){
    if(!selGen)return;setGenLoading(true);setGenOutput("");setCopied(false);
    try{
      var prompt=selGen.build(genFields,settings.name,settings.school);
      var r=await fetch("https://hod-proxy.t-d-haycock.workers.dev",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:1000,system:"You are a specialist document drafter for a Head of Science at a UK secondary school. Output ONLY the requested document - no preamble, no explanation. UK English. Ready to copy and use immediately.",messages:[{role:"user",content:prompt}]})});
      var data=await r.json();
      var reply=(data.content&&data.content.find(function(b){return b.type==="text";}));
      setGenOutput(reply?reply.text:"Sorry, could not generate output.");
    }catch(e){setGenOutput("Could not connect - please try again.");}
    setGenLoading(false);
  }
  function copyGen(){navigator.clipboard.writeText(genOutput).then(function(){setCopied(true);setTimeout(function(){setCopied(false);},2500);}).catch(function(){});}

  async function submitSuggestion(){
    if(!suggestInput.trim())return;setSuggestLoading(true);setSuggestResult(null);
    try{
      var r=await fetch("https://hod-proxy.t-d-haycock.workers.dev",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:900,system:"You evaluate whether a document automation is feasible for a Head of Science using an AI language model. Be direct and honest. If it needs live school database access, real-time data, genuine curriculum design, legal advice, or truly personalised pedagogy - say no. Respond ONLY with valid JSON, no markdown.",messages:[{role:"user",content:'Suggestion: "'+suggestInput.trim()+'"\nCategory: '+GENS[suggestCat].label+'\n\nJSON: {"feasible":true/false,"reason":"1-2 sentences","generator":{"title":"4-6 words","desc":"one line","saves":"~X mins","fields":[{"key":"k","label":"Label","type":"text|select|textarea","ph":"placeholder","opts":["A","B"]}],"promptTemplate":"detailed prompt using {fieldKey} placeholders"}}\nIf feasible=false, generator=null. Max 4 fields. opts only for select type.'}]})});
      var data=await r.json();
      var raw=(data.content&&data.content.find(function(b){return b.type==="text";}));
      setSuggestResult(JSON.parse((raw?raw.text:"{}").replace(/```json|```/g,"").trim()));
    }catch(e){setSuggestResult({feasible:false,reason:"Something went wrong - please try again.",generator:null});}
    setSuggestLoading(false);
  }
  function addCustomGen(){
    if(!suggestResult||!suggestResult.feasible||!suggestResult.generator)return;
    var g=suggestResult.generator;
    var newGen={id:"custom_"+Date.now(),title:g.title,desc:g.desc,saves:g.saves,fields:g.fields,custom:true,build:function(f){return g.promptTemplate.replace(/\{(\w+)\}/g,function(_,k){return f[k]||"["+k+"]";});}};
    setCustomGens(function(prev){var next=Object.assign({},prev);next[suggestCat]=prev[suggestCat].concat([newGen]);return next;});
    setAutoTab(suggestCat);setSuggestInput("");setSuggestResult(null);setShowSuggest(false);
  }
  function removeCustomGen(catKey,genId){
    setCustomGens(function(prev){var next=Object.assign({},prev);next[catKey]=prev[catKey].filter(function(g){return g.id!==genId;});return next;});
    if(selGen&&selGen.id===genId){setSelGen(null);setGenFields({});setGenOutput("");}
  }

  // --- Email paste-and-process functions ---
  function handleEmailFiles(fileList){
    var arr = Array.from(fileList);
    var accepted = arr.filter(function(f){
      var ok = ["application/pdf","image/png","image/jpeg","image/jpg","image/gif","image/webp",
        "application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/plain","text/csv"].indexOf(f.type)>-1 || f.name.match(/\.(pdf|png|jpg|jpeg|gif|webp|doc|docx|xls|xlsx|txt|csv)$/i);
      return ok && f.size < 10*1024*1024;
    });
    setEmailFiles(function(prev){return prev.concat(accepted).slice(0,5);});
  }

  function removeEmailFile(idx){
    setEmailFiles(function(prev){return prev.filter(function(_,i){return i!==idx;});});
  }

  function fileIcon(f){
    if(f.type==="application/pdf"||f.name.match(/\.pdf$/i))return "📄";
    if(f.type.startsWith("image/"))return "🖼";
    if(f.name.match(/\.docx?$/i))return "📝";
    if(f.name.match(/\.xlsx?$/i))return "📊";
    if(f.name.match(/\.(txt|csv)$/i))return "📋";
    return "📎";
  }

  function readFileAsBase64(file){
    return new Promise(function(resolve,reject){
      var reader = new FileReader();
      reader.onload = function(){resolve({name:file.name,type:file.type,data:reader.result.split(",")[1]});};
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function processEmail(){
    if(!emailText.trim())return;
    setEmailProcessing(true);
    setEmailResult(null);
    try{
      // Build message content - text first, then any files
      var contentBlocks = [];

      // Add attachments as content blocks
      for(var fi=0; fi<emailFiles.length; fi++){
        var f = emailFiles[fi];
        try{
          var b64 = await readFileAsBase64(f);
          if(f.type==="application/pdf"||f.name.match(/\.pdf$/i)){
            contentBlocks.push({type:"document",source:{type:"base64",media_type:"application/pdf",data:b64.data},title:f.name});
          } else if(f.type.startsWith("image/")){
            var imgType = f.type||"image/jpeg";
            contentBlocks.push({type:"image",source:{type:"base64",media_type:imgType,data:b64.data}});
          } else {
            // For Word, Excel, CSV, text - include as text note
            contentBlocks.push({type:"text",text:"[Attachment: "+f.name+" - "+Math.round(f.size/1024)+"KB - note: binary file, extract any key information visible in filename and context]"});
          }
        }catch(fe){
          contentBlocks.push({type:"text",text:"[Attachment: "+f.name+" - could not read]"});
        }
      }

      // Build the prompt text
      var promptText = "Process this email for "+(settings.name||"a Head of Science")+(settings.school?" at "+settings.school:"")+". \n\n";
      if(emailSender) promptText += "FROM: "+emailSender+"\n";
      if(emailSubject) promptText += "SUBJECT: "+emailSubject+"\n";
      if(emailFiles.length>0) promptText += "ATTACHMENTS: "+emailFiles.map(function(f){return f.name;}).join(", ")+"\n";
      promptText += "\nEMAIL BODY:\n"+emailText;
      if(emailFiles.length>0) promptText += "\n\nThe attachments are included above. Extract any relevant information from them.";
      promptText += "\n\nReturn ONLY valid JSON (no markdown) with this structure: {summary, senderType (parent/colleague/slt/admin/external), urgency (urgent/high/medium/low), needsReply (boolean), keyPoints (array of strings), actions (array of {title,category,priority,dueDate,estimatedMins,notes} - category must be one of teaching/leadership/pastoral/admin/cpd, priority one of urgent/high/medium/low, dueDate as YYYY-MM-DD or empty string), replyDraft (string - professional reply body, UK English, signed off as "+(settings.name||"[Your name]")+", Head of Science"+(settings.school?", "+settings.school:"")+"), attachmentInsights (array of strings about any attachments, empty if none)}";

      contentBlocks.push({type:"text",text:promptText});

      var r = await fetch("https://hod-proxy.t-d-haycock.workers.dev",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-haiku-4-5-20251001",max_tokens:2000,
          system:"You are an expert email processor for a Head of Science at a UK secondary school. Analyse emails and attachments thoroughly. Extract all action items with realistic deadlines. Draft professional, warm replies in UK English. Return ONLY valid JSON.",
          messages:[{role:"user",content:contentBlocks}]
        })
      });
      var data = await r.json();
      var raw = (data.content&&data.content.find(function(b){return b.type==="text";}));
      if(raw){
        var result = JSON.parse(raw.text.replace(/```json|```/g,"").trim());
        setEmailResult(result);
        // Auto-add any tasks with dates to task list
        if(result.actions&&result.actions.length>0){
          var newTasks = result.actions.filter(function(a){return a.title&&a.dueDate;}).map(function(a){
            return {id:Date.now()+Math.random(),title:a.title,category:a.category||"admin",priority:a.priority||"medium",dueDate:a.dueDate,estimatedMins:a.estimatedMins||30,done:false,notes:a.notes||"",scheduledDay:null,recurring:null};
          });
          if(newTasks.length>0) setTasks(function(ts){return ts.concat(newTasks);});
        }
      }
    }catch(e){
      setEmailResult({summary:"Could not process - please try again.",senderType:"admin",urgency:"medium",needsReply:false,keyPoints:[],actions:[],replyDraft:"",attachmentInsights:[],error:true});
    }
    setEmailProcessing(false);
  }

  function copyReply(){
    if(!emailResult||!emailResult.replyDraft)return;
    navigator.clipboard.writeText(emailResult.replyDraft).then(function(){
      setEmailReplyCopied(true);
      setTimeout(function(){setEmailReplyCopied(false);},2500);
    }).catch(function(){});
  }

  function emailResultToTask(action){
    setNewTask({title:action.title,category:action.category||"admin",priority:action.priority||"medium",dueDate:action.dueDate||"",estimatedMins:action.estimatedMins||30,notes:action.notes||"",recurring:null});
    setView("add");
  }

  // --- Meetings functions ---
  function addAgendaPoint(mtId,point,priority,source){
    var pt={id:"ag"+Date.now(),point:point.trim(),source:source||"manual",addedDate:new Date().toISOString().split("T")[0],done:false,priority:priority||"medium"};
    setAgenda(function(prev){var next=Object.assign({},prev);next[mtId]=(prev[mtId]||[]).concat([pt]);return next;});
  }

  function toggleAgendaPoint(mtId,ptId){
    setAgenda(function(prev){
      var next=Object.assign({},prev);
      next[mtId]=(prev[mtId]||[]).map(function(p){return p.id===ptId?Object.assign({},p,{done:!p.done}):p;});
      return next;
    });
  }

  function removeAgendaPoint(mtId,ptId){
    setAgenda(function(prev){
      var next=Object.assign({},prev);
      next[mtId]=(prev[mtId]||[]).filter(function(p){return p.id!==ptId;});
      return next;
    });
  }

  function clearDonePoints(mtId){
    setAgenda(function(prev){
      var next=Object.assign({},prev);
      next[mtId]=(prev[mtId]||[]).filter(function(p){return !p.done;});
      return next;
    });
  }

  function addMeeting(){
    if(!newMtg.name.trim())return;
    var mt=Object.assign({},newMtg,{id:"mt"+Date.now()});
    setMeetings(function(prev){return prev.concat([mt]);});
    setAgenda(function(prev){var next=Object.assign({},prev);next[mt.id]=[];return next;});
    setSelMtId(mt.id);
    setNewMtg({name:"",day:"Mon",time:"15:30",frequency:"weekly",attendees:"",location:"",color:"#8B5CF6"});
    setShowAddMeeting(false);
  }

  function removeMeeting(mtId){
    setMeetings(function(prev){return prev.filter(function(m){return m.id!==mtId;});});
    setAgenda(function(prev){var next=Object.assign({},prev);delete next[mtId];return next;});
    if(selMtId===mtId&&meetings.length>1){
      var remaining=meetings.filter(function(m){return m.id!==mtId;});
      if(remaining.length>0)setSelMtId(remaining[0].id);
    }
  }

  function addEmailPointToMeeting(mtId,point){
    addAgendaPoint(mtId,point,"medium","email");
    setAddToMtgPoint(null);
  }

  async function generateAgenda(){
    var mt=meetings.find(function(m){return m.id===selMtId;});
    if(!mt)return;
    var pts=(agenda[selMtId]||[]).filter(function(p){return !p.done;});
    setAgendaGenLoading(true);setAgendaOutput("");
    try{
      var r=await fetch("https://hod-proxy.t-d-haycock.workers.dev",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-haiku-4-5-20251001",max_tokens:1000,
          system:"You are generating a professional meeting agenda for "+(settings.name||"a Head of Science")+(settings.school?" at "+settings.school:"")+". Format it clearly, allocate realistic time to each item, include standard sections. UK school professional format. Output only the agenda text, ready to share.",
          messages:[{role:"user",content:"Generate a formatted agenda for:\n\nMeeting: "+mt.name+"\nDay/Time: "+mt.day+" at "+mt.time+"\nAttendees: "+(mt.attendees||"TBC")+"\nLocation: "+(mt.location||"TBC")+"\nFrequency: "+mt.frequency+"\n\nAgenda points:\n"+pts.map(function(p,i){return (i+1)+". ["+p.priority.toUpperCase()+"] "+p.point;}).join("\n")+"\n\nInclude: welcome/apologies, previous minutes, the agenda items with time allocations, AOB, date of next meeting. Total meeting time should feel realistic for the number of items."}]
        })
      });
      var data=await r.json();
      var txt=data.content&&data.content.find(function(b){return b.type==="text";});
      setAgendaOutput(txt?txt.text:"Could not generate agenda.");
    }catch(e){setAgendaOutput("Connection error - please try again.");}
    setAgendaGenLoading(false);
  }

  async function addToCalendar(){
    var mt=meetings.find(function(m){return m.id===selMtId;});
    if(!mt)return;
    setCalLoading(true);setCalMsg("");
    var pts=(agenda[selMtId]||[]).filter(function(p){return !p.done;});
    var desc="Agenda:\n"+pts.map(function(p,i){return (i+1)+". "+p.point;}).join("\n");
    desc+="\n\nAttendees: "+(mt.attendees||"TBC")+"\nLocation: "+(mt.location||"TBC");
    try{
      var r=await fetch("https://hod-proxy.t-d-haycock.workers.dev",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-haiku-4-5-20251001",max_tokens:500,
          system:"You create Google Calendar events using MCP tools. Create the event and confirm success. Be concise.",
          messages:[{role:"user",content:"Create a Google Calendar event: Title: "+mt.name+". Date: next "+mt.day+". Time: "+mt.time+". Duration: 60 minutes. Description: "+desc+". Confirm when done."}],
          mcp_servers:[{type:"url",url:"https://calendarmcp.googleapis.com/mcp/v1",name:"google-calendar"}]
        })
      });
      var data=await r.json();
      var txt=data.content&&data.content.find(function(b){return b.type==="text";});
      setCalMsg(txt?txt.text:"Event creation attempted - check your Google Calendar.");
    }catch(e){setCalMsg("Could not connect to Google Calendar - please try again.");}
    setCalLoading(false);
  }

  var FREQ_LABELS={weekly:"Weekly",fortnightly:"Fortnightly",halfTermly:"Half-termly"};
  var PRI_COLORS={urgent:"#EF4444",high:"#F97316",medium:"#EAB308",low:"#22C55E"};
  var SOURCE_LABELS={manual:"Manual",email:"From email",task:"From task"};

  // ─── Home Life functions ───────────────────────────────────────────────────
  function switchMode(m){
    setAppMode(m);
    if(m==="home") setView("h-dash");
    else if(m==="work") setView("focus");
    else if(m==="cal") setView("__cal__");
  }
  function setHSt(key,val){setHomeSettings(function(s){return Object.assign({},s,{[key]:val});});}
  function toggleHomeSet(key){setOpenHomeSet(function(o){return o.includes(key)?o.filter(function(k){return k!==key;}):[].concat(o,[key]);});}
  function HomeSection(id,title,icon,children){
    var open=openHomeSet.includes(id);
    return React.createElement("div",{style:card({marginBottom:10,padding:0,overflow:"hidden"})},
      React.createElement("button",{onClick:function(){toggleHomeSet(id);},style:{width:"100%",background:"none",border:"none",cursor:"pointer",padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",textAlign:"left"}},
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
          React.createElement("span",{style:{fontSize:18}},icon),
          React.createElement("span",{style:{fontFamily:"inherit",fontSize:13,fontWeight:700,color:th.text}},title)
        ),
        React.createElement("span",{style:{color:th.textMuted,transform:open?"rotate(90deg)":"none",transition:"transform 0.2s",fontSize:18}},">")
      ),
      open?React.createElement("div",{style:{padding:"0 16px 16px",borderTop:"1px solid "+th.border}},children):null
    );
  }
  function updateFamilyName(id,name){setFamily(function(prev){return prev.map(function(f){return f.id===id?Object.assign({},f,{name:name}):f;});});}
  function updateFamilyRole(id,role){setFamily(function(prev){return prev.map(function(f){return f.id===id?Object.assign({},f,{role:role}):f;});});}

  function buildCalEvents(dateKey){
    var evs=[];
    var d=new Date(dateKey+"T12:00:00");
    var dowIdx=d.getDay();
    var dowMap=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var dayKey=dowMap[dowIdx];
    var isWeekday=dowIdx>=1&&dowIdx<=5;
    var schoolWk=null;
    for(var i=0;i<SCHOOL_WEEKS.length;i++){
      var sw=SCHOOL_WEEKS[i];
      if(dateKey>=sw.wc&&dateKey<=sw.ends){schoolWk=sw;break;}
    }
    if(schoolWk&&isWeekday){
      var ttDay=TT[schoolWk.ab][dayKey];
      if(ttDay){
        for(var j=0;j<PERIODS.length;j++){
          var per=PERIODS[j];
          var slot=ttDay[per.id];
          if(slot){
            var lc2=LC[slot.t]||LC.free;
            evs.push({t:slot.t==="form"?"form":"work",time:per.start,endTime:per.end,
              title:slot.l+(slot.g?" – "+slot.g:""),sub:per.label+(slot.n?" · "+slot.n:""),
              source:"timetable",barColor:lc2.bd,bgColor:lc2.bg,txColor:lc2.tx});
          }
        }
        meetings.forEach(function(mtg){
          if(mtg.day===dayKey){
            evs.push({t:"work",time:mtg.time,endTime:"",title:mtg.name,
              sub:(mtg.attendees||"")+(mtg.location?" · "+mtg.location:""),
              source:"meeting",barColor:mtg.color,bgColor:mtg.color+"18",txColor:mtg.color});
          }
        });
      }
    }
    // For recurring tasks, only show the single next upcoming occurrence per group
    var shownGroups={};
    var today2=dkStr(TODAY);
    tasks.filter(function(t){return !t.done&&t.dueDate&&t.dueDate>=today2;}).forEach(function(t){
      var gid=t.recurringGroupId||t.id;
      if(!shownGroups[gid]||t.dueDate<shownGroups[gid])shownGroups[gid]=t.dueDate;
    });
    tasks.filter(function(t){
      if(t.done||!t.dueDate)return false;
      if(t.dueDate!==dateKey)return false;
      var gid=t.recurringGroupId||t.id;
      if(t.recurringGroupId&&shownGroups[gid]&&shownGroups[gid]!==dateKey)return false;
      return true;
    }).forEach(function(task){
      var cat=CATS[task.category];
      evs.push({t:"work",time:"00:00",endTime:"",isDue:true,
        title:"Due: "+task.title,sub:cat.label+" · "+PRIS[task.priority].label,
        source:"task",barColor:cat.color,bgColor:cat.color+"18",txColor:cat.color});
    });
    clubs.filter(function(c){return isClubActive(c,dateKey);}).forEach(function(c){
      var mem=family.find(function(f){return f.id===c.memberId;})||{name:"",role:c.memberId,color:"#10B981"};
      evs.push({t:"home",time:c.time||"17:00",endTime:"",
        title:c.name,sub:(mem.name||mem.role)+(c.location?" · "+c.location:""),
        source:"club",barColor:mem.color,bgColor:mem.color+"18",txColor:mem.color,
        clubId:c.id,canSkip:true});
    });
    // Add custom calendar events
    calEvents2.filter(function(ce){return ce.date===dateKey;}).forEach(function(ce){
      var typeColors={work:{bar:"#378ADD",bg:"#E6F1FB",tx:"#0C447C"},home:{bar:"#639922",bg:"#EAF3DE",tx:"#27500A"},both:{bar:"#7C3AED",bg:"#F3E8FF",tx:"#4C1D95"}};
      var tc=typeColors[ce.type]||typeColors.work;
      evs.push({t:ce.type==="home"?"home":"work",time:ce.time||"00:00",endTime:"",
        title:ce.title,sub:ce.notes||"Custom event",source:"custom",
        barColor:tc.bar,bgColor:tc.bg,txColor:tc.tx,customId:ce.id});
    });

    // Add Google Calendar events for this date
    gcalEvents.forEach(function(ge){
      if(!ge.startDate)return;
      var gdk=dkFromDate(ge.startDate);
      if(gdk===dateKey){
        var gtime=ge.allDay?"":String(ge.startDate.getHours()).padStart(2,"0")+":"+String(ge.startDate.getMinutes()).padStart(2,"0");
        evs.push({t:"gcal",time:gtime||"00:00",endTime:"",
          title:ge.title,sub:(ge.location||ge.description||"Google Calendar"),
          source:"gcal",barColor:"#7C3AED",bgColor:"#F3E8FF",txColor:"#4C1D95",
          allDay:ge.allDay});
      }
    });

    evs.sort(function(a,b){
      if(a.isDue&&!b.isDue)return -1;
      if(!a.isDue&&b.isDue)return 1;
      return a.time.localeCompare(b.time);
    });
    var hasWorkPM=evs.some(function(e){return e.t==="work"&&e.time>="15:00";});
    var hasHomePM=evs.some(function(e){return e.t==="home"&&e.time>="15:00";});
    if(hasWorkPM&&hasHomePM){
      evs.forEach(function(e){
        if(e.time>="15:00")e.clash=true;
      });
    }
    return evs;
  }

  function calDayHasWork(dk2){
    var d2=new Date(dk2+"T12:00:00");
    var dw2=d2.getDay();
    if(dw2>=1&&dw2<=5){
      for(var i=0;i<SCHOOL_WEEKS.length;i++){var sw=SCHOOL_WEEKS[i];if(dk2>=sw.wc&&dk2<=sw.ends)return true;}
    }
    return tasks.some(function(t){return t.dueDate===dk2&&!t.done;});
  }
  function calDayHasHome(dk2){
    return clubs.some(function(c){return isClubActive(c,dk2);});
  }
  function calDayHasCustom(dk2){
    return calEvents2.some(function(ce){return ce.date===dk2;});
  }
  function calDayHasGcal(dk2){
    return gcalEvents.some(function(ge){return ge.startDate&&dkFromDate(ge.startDate)===dk2;});
  }
  function calDayHasClash(dk2){
    var evs2=buildCalEvents(dk2);
    var hw=evs2.some(function(e){return e.t==="work"&&e.time>="15:00";});
    var hh=evs2.some(function(e){return e.t==="home"&&e.time>="15:00";});
    return hw&&hh;
  }
  function addClub(){
    if(!newClub.name.trim())return;
    setClubs(function(prev){return prev.concat([Object.assign({},newClub,{id:"cl"+Date.now(),exceptions:[]})]);});
    setNewClub({memberId:"dad",name:"",day:"Mon",time:"17:00",location:"",costPerMonth:0,notes:""});
    setShowAddClub(false);
  }
  function removeClub(id){setClubs(function(prev){return prev.filter(function(c){return c.id!==id;});});}
  function updateClub(upd){setClubs(function(prev){return prev.map(function(c){return c.id===upd.id?upd:c;});});setEditClub(null);}
  function skipClubOccurrence(clubId,dateKey){
    setClubs(function(prev){return prev.map(function(c){
      if(c.id!==clubId)return c;
      var excs=(c.exceptions||[]).slice();
      if(excs.indexOf(dateKey)<0)excs.push(dateKey);
      return Object.assign({},c,{exceptions:excs});
    });});
  }
  function isClubActive(club,dateKey){
    var d=new Date(dateKey+"T12:00:00");
    var dayNames=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    if(club.day!==dayNames[d.getDay()])return false;
    var excs=club.exceptions||[];
    if(excs.indexOf(dateKey)>=0)return false;
    if(club.frequency==="fortnightly"){
      var ref=new Date("2026-06-01");
      var wkNum=Math.floor((d-ref)/(7*24*3600*1000));
      var off=club.fortnightOffset||0;
      if(((wkNum%2)+2)%2!==off)return false;
    }
    return true;
  }
  function updateFinIncome(v){setFinances(function(f){return Object.assign({},f,{monthlyIncome:parseFloat(v)||0});});}
  function updateFinItem(id,field,val){
    setFinances(function(f){
      var items=f.items.map(function(item){return item.id===id?Object.assign({},item,{[field]:field==="amount"?parseFloat(val)||0:val}):item;});
      return Object.assign({},f,{items:items});
    });
  }
  function removeFinItem(id){setFinances(function(f){return Object.assign({},f,{items:f.items.filter(function(i){return i.id!==id;})});});}
  function addFinItem(){
    if(!newFin.name.trim())return;
    var ni=Object.assign({},newFin,{id:"fi"+Date.now()});
    setFinances(function(f){return Object.assign({},f,{items:f.items.concat([ni])});});
    setNewFin({name:"",amount:0,category:"other",frequency:"monthly"});
    setShowAddFin(false);
  }
  function updateSavGoal(id,field,val){
    setFinances(function(f){
      var goals=f.savingsGoals.map(function(g){return g.id===id?Object.assign({},g,{[field]:field==="current"||field==="target"?parseFloat(val)||0:val}):g;});
      return Object.assign({},f,{savingsGoals:goals});
    });
  }
  function setMealDay(day,val){setMealPlan(function(p){return Object.assign({},p,{[day]:val});});}
  function addToFavs(meal){if(meal&&!mealFavs.includes(meal))setMealFavs(function(f){return f.concat([meal]);});}
  function removeFav(meal){setMealFavs(function(f){return f.filter(function(m){return m!==meal;});});}
  async function suggestMeals(){
    setMealLoading(true);setMealSugg("");
    try{
      var r=await fetch("https://hod-proxy.t-d-haycock.workers.dev",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:700,
          system:"You suggest healthy, budget-friendly evening meals for a busy UK family of 4: two adults and children aged 10 and 7. Meals must be quick (under 45 mins), nutritious, appealing to children, and budget-conscious. No preamble.",
          messages:[{role:"user",content:"Suggest 7 evening meals for Mon-Sun. Family favourites include: "+mealFavs.slice(0,6).join(", ")+". Format as exactly 7 lines: Mon: [Meal name] - [one line why it works]"}]})});
      var data=await r.json();
      var txt=data.content&&data.content.find(function(b){return b.type==="text";});
      setMealSugg(txt?txt.text:"Could not generate suggestions.");
    }catch(e){setMealSugg("Connection error - please try again.");}
    setMealLoading(false);
  }
  async function buildShoppingFromMeals(){
    var planned=Object.entries(mealPlan).filter(function(e){return e[1];});
    if(planned.length===0)return;
    setMealLoading(true);
    try{
      var r=await fetch("https://hod-proxy.t-d-haycock.workers.dev",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:600,
          system:"Generate a shopping list from a meal plan for a UK family of 4. Return ONLY a JSON array, no markdown. Each item has name and category fields. Category must be one of: fruit and veg, dairy, meat and fish, bakery, cupboard, frozen, drinks, household, other.",
          messages:[{role:"user",content:"Meals this week: "+planned.map(function(e){return e[0]+": "+e[1];}).join(", ")+". Family of 4. Return JSON array only."}]})});
      var data=await r.json();
      var txt=data.content&&data.content.find(function(b){return b.type==="text";});
      if(txt){
        var items=JSON.parse(txt.text.replace(/```json|```/g,"").trim());
        var newItems=items.map(function(i){return {id:"sp"+Date.now()+Math.random().toString(36).slice(2),name:i.name||"item",category:i.category||"other",recurring:false,done:false};});
        setShoppingList(function(prev){return prev.concat(newItems);});
      }
    }catch(e){}
    setMealLoading(false);
  }
  function addShopItem(){if(!newShopItem.trim())return;setShoppingList(function(p){return p.concat([{id:"sp"+Date.now(),name:newShopItem.trim(),category:newShopCat,recurring:false,done:false}]);});setNewShopItem("");}
  function toggleShopItem(id){setShoppingList(function(p){return p.map(function(i){return i.id===id?Object.assign({},i,{done:!i.done}):i;});});}
  function removeShopItem(id){setShoppingList(function(p){return p.filter(function(i){return i.id!==id;});});}
  function clearDoneShop(){setShoppingList(function(p){return p.filter(function(i){return !i.done;});});}

  // Home derived
  var totalMonthlyOut=finances.items.reduce(function(s,i){return s+(i.frequency==="weekly"?i.amount*4:i.amount);},0);
  var monthlyLeft=finances.monthlyIncome-totalMonthlyOut;
  var weeklyLeft=monthlyLeft/4;
  var totalClubCosts=clubs.reduce(function(s,c){return s+(parseFloat(c.costPerMonth)||0);},0);
  var todayDay=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][TODAY.getDay()];
  var todayClubs=clubs.filter(function(c){return c.day===todayDay;});
  var tonightsMeal=mealPlan[todayDay]||"";

  var URGENCY_COLOR = {urgent:"#EF4444",high:"#F97316",medium:"#EAB308",low:"#22C55E"};
  var CAT_LABELS = {parent:"Parent",colleague:"Colleague",slt:"SLT",admin:"Admin",external:"External"};
  var CAT_COLOR = {parent:"#0EA5E9",colleague:"#8B5CF6",slt:"#F97316",admin:"#64748B",external:"#10B981"};

  // Wellbeing calcs
  var totalHrs=Object.values(wb).reduce(function(s,d){return s+(parseFloat(d.hours)||0);},0);
  var loggedDays=Object.values(wb).filter(function(d){return d.hours!=="";}).length;
  var moodVals=Object.values(wb).map(function(d){return d.mood;}).filter(Boolean);
  var avgMood=moodVals.length?moodVals.reduce(function(s,m){return s+m;},0)/moodVals.length:null;
  var avgMoodObj=avgMood?MOODS.find(function(m){return m.val===Math.round(avgMood);}):null;
  function burnoutInfo(){
    if(!loggedDays)return null;
    if(totalHrs>58||(totalHrs>52&&avgMood&&avgMood<=2))return{level:"Critical",col:th.red,bg:th.redBg,icon:"🚨",msg:"Significantly over safe limits. Education Support: 0800 562 561 (free, 24/7)"};
    if(totalHrs>52||(totalHrs>45&&avgMood&&avgMood<=2))return{level:"High",col:th.amber,bg:th.amberBg,icon:"⚠",msg:"Above the UK 48hr Working Time Regulations limit. Guard your evenings."};
    if(totalHrs>45||(avgMood&&avgMood<=2))return{level:"Moderate",col:th.amber,bg:th.amberBg,icon:"📊",msg:"Load is building. Try to protect at least one evening this week."};
    return{level:"Manageable",col:th.green,bg:th.greenBg,icon:"✅",msg:"Good balance this week - within healthy limits."};
  }
  var burnout=burnoutInfo();

  var calWk1=SCHOOL_WEEKS[calPage*2]||SCHOOL_WEEKS[0];
  var calWk2=SCHOOL_WEEKS[calPage*2+1]||SCHOOL_WEEKS[1];
  var calSelEvs=buildCalEvents(calSel);
  var calSelFiltered=calFilter==="all"?calSelEvs:calSelEvs.filter(function(e){
    if(calFilter==="work")return e.t==="work"||e.t==="form";
    if(calFilter==="home")return e.t==="home";
    if(calFilter==="clash")return e.clash;
    return true;
  });
  function calWeekDays(wc){
    var days=[];
    var base=new Date(wc+"T12:00:00");
    for(var i=0;i<7;i++){days.push(new Date(base.getFullYear(),base.getMonth(),base.getDate()+i));}
    return days;
  }
  function dkStr(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
  var MOS=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var DOWF2=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var calTodayStr=dkStr(TODAY);

  var pending=tasks.filter(function(t){return !t.done;});
  var overdueTasks=pending.filter(function(t){return daysUntil(t.dueDate)<0;});
  var focusTasks=pending.slice().sort(function(a,b){return scoreTask(b)-scoreTask(a);}).slice(0,3);
  var sortedTasks=tasks.filter(function(t){return !t.done||showDone;}).filter(function(t){return filterCat==="all"||t.category===filterCat;}).sort(function(a,b){return scoreTask(b)-scoreTask(a);});
  var unscheduled=pending.filter(function(t){return !t.scheduledDay;});
  var pomoTask=tasks.find(function(t){return t.id===pomo.taskId;});
  var curGenCat=GENS[autoTab];
  var curGenItems=curGenCat.items.concat(customGens[autoTab]||[]);
  var htDays=daysUntil(settings.halfTerm);
  var showHtWarn=htDays>=0&&htDays<=5;

  // Timetable helpers
  var ttDayNames=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  var todayDayKey=ttDayNames[TODAY.getDay()];
  var curTtWeekIdx=(function(){
    for(var i=0;i<SCHOOL_WEEKS.length;i++){
      var ws=new Date(SCHOOL_WEEKS[i].start);
      var we=new Date(ws.getTime()+5*86400000);
      if(TODAY>=ws&&TODAY<we)return i;
    }
    if(TODAY<new Date(SCHOOL_WEEKS[0].start))return 0;
    return SCHOOL_WEEKS.length-1;
  })();
  var isViewingCurWeek = ttWeek===curTtWeekIdx;
  function getLesson(wType,day,pid){
    var d=TT[wType]&&TT[wType][day];
    if(!d)return null;
    var l=d[pid];
    if(l===undefined||l===null)return null;
    if(l==="f")return{c:"form",g:"10TDH"};
    if(l===1&&pid==="sep")return{c:"sep",g:""};
    return l;
  }
  function classInfo(c){return CLASS_DEF[c]||{color:"#94A3B8",bg:"#F8FAFC",label:"Free",short:"Free"};}

  var WORK_NAV=[{id:"focus",label:"🎯 Focus"},{id:"planner",label:"📅 Week"},{id:"timetable",label:"📅 Timetable"},{id:"all",label:"📋 Tasks"},{id:"timer",label:"🍅 Timer"},{id:"automate",label:"⚡ Auto"},{id:"meetings",label:"📆 Meetings"},{id:"wellbeing",label:"💚 Wellbeing"},{id:"ai",label:"🤖 AI"},{id:"email",label:"📬 Email"},{id:"add",label:"+ Add"},{id:"settings",label:"⚙ Settings"}];
  var HOME_NAV=[{id:"h-dash",label:"🏠 Home"},{id:"h-clubs",label:"🏃 Clubs"},{id:"h-finance",label:"💰 Finance"},{id:"h-meals",label:"🍽 Meals"},{id:"h-email",label:"📬 Email"},{id:"h-settings",label:"⚙ Settings"}];
  var NAV=appMode==="home"?HOME_NAV:WORK_NAV;

  // Style helpers -- no spread, use Object.assign
  function card(extra){return Object.assign({background:th.surface,border:"1px solid "+th.border,borderRadius:10,padding:"14px 16px",boxShadow:"0 2px 8px "+th.shadow},extra||{});}
  function inpSt(extra){return Object.assign({width:"100%",background:th.inp,border:"1.5px solid "+th.border,borderRadius:8,padding:"9px 13px",color:th.text,fontSize:13,fontFamily:"'DM Mono',monospace"},extra||{});}
  function selSt(extra){return Object.assign({width:"100%",background:th.inp,border:"1.5px solid "+th.border,borderRadius:8,padding:"9px 13px",color:th.text,fontSize:13,fontFamily:"inherit"},extra||{});}
  function lblSt(extra){return Object.assign({fontSize:11,letterSpacing:"0.09em",textTransform:"uppercase",color:th.textMuted,display:"block",marginBottom:5},extra||{});}
  function badge(bg,col,bdr){return {display:"inline-flex",alignItems:"center",padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:500,letterSpacing:"0.04em",background:bg,color:col,border:"1px solid "+(bdr||bg)};}

  function SetSection(id,title,icon,children){
    var open=openSet.includes(id);
    return (
      React.createElement("div",{style:card({marginBottom:10,padding:0,overflow:"hidden"})},
        React.createElement("button",{onClick:function(){toggleSet(id);},style:{width:"100%",background:"none",border:"none",cursor:"pointer",padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",textAlign:"left"}},
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
            React.createElement("span",{style:{fontSize:18}},icon),
            React.createElement("span",{style:{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:th.text}},title)
          ),
          React.createElement("span",{style:{color:th.textMuted,transform:open?"rotate(90deg)":"none",transition:"transform 0.2s",fontSize:18}},"›")
        ),
        open?React.createElement("div",{style:{padding:"0 16px 16px",borderTop:"1px solid "+th.border}},children):null
      )
    );
  }


  // ─── Edit Task Modal ────────────────────────────────────────────────────
  function EditTaskModal(){
    if(!editTask)return null;
    var isAll=editTask._editAll;
    return React.createElement("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}},
      React.createElement("div",{style:{background:th.surface,border:"1px solid "+th.border,borderRadius:14,padding:"20px",width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}},
        React.createElement("div",{style:{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800,color:th.text,marginBottom:isAll?6:14}},isAll?"Edit All Occurrences":"Edit Task"),
        isAll&&React.createElement("div",{style:{fontSize:11,color:th.amber,background:th.amberBg,border:"1px solid "+th.amber+"44",borderRadius:6,padding:"6px 10px",marginBottom:14}},"Changes to title, category, priority and notes will apply to all future occurrences of this task."),
        React.createElement("div",{style:{marginBottom:10}},
          React.createElement("label",{style:lblSt()},"Title"),
          React.createElement("div",{style:{display:"flex",gap:6}},
            React.createElement("input",{type:"text",value:editTask.title,onChange:function(e){var v=e.target.value;setEditTask(function(t){return Object.assign({},t,{title:v});});},style:inpSt({flex:1})}),
            MicBtn(function(fn){setEditTask(function(t){return Object.assign({},t,{title:typeof fn==="function"?fn(t.title):fn});});}, "edit-title")
          )
        ),
        React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}},
          React.createElement("div",null,
            React.createElement("label",{style:lblSt()},"Category"),
            React.createElement("select",{value:editTask.category,onChange:function(e){var v=e.target.value;setEditTask(function(t){return Object.assign({},t,{category:v});});},style:selSt()},
              Object.keys(CATS).map(function(k){return React.createElement("option",{key:k,value:k},CATS[k].icon+" "+CATS[k].label);})
            )
          ),
          React.createElement("div",null,
            React.createElement("label",{style:lblSt()},"Priority"),
            React.createElement("select",{value:editTask.priority,onChange:function(e){var v=e.target.value;setEditTask(function(t){return Object.assign({},t,{priority:v});});},style:selSt()},
              Object.keys(PRIS).map(function(k){return React.createElement("option",{key:k,value:k},PRIS[k].label);})
            )
          ),
          React.createElement("div",null,
            React.createElement("label",{style:lblSt()},"Due date"),
            React.createElement("input",{type:"date",value:editTask.dueDate,onChange:function(e){var v=e.target.value;setEditTask(function(t){return Object.assign({},t,{dueDate:v});});},style:inpSt({colorScheme:"light"})})
          ),
          React.createElement("div",null,
            React.createElement("label",{style:lblSt()},"Est. time (mins)"),
            React.createElement("input",{type:"number",min:5,step:5,value:editTask.estimatedMins,onChange:function(e){var v=parseInt(e.target.value)||0;setEditTask(function(t){return Object.assign({},t,{estimatedMins:v});});},style:inpSt()})
          )
        ),
        React.createElement("div",{style:{marginBottom:16}},
          React.createElement("label",{style:lblSt()},"Notes"),
          React.createElement("div",{style:{display:"flex",gap:6}},
            React.createElement("textarea",{value:editTask.notes||"",onChange:function(e){var v=e.target.value;setEditTask(function(t){return Object.assign({},t,{notes:v});});},rows:2,style:inpSt({resize:"vertical",flex:1})}),
            MicBtn(function(fn){setEditTask(function(t){return Object.assign({},t,{notes:typeof fn==="function"?fn(t.notes||""):fn});});}, "edit-notes")
          )
        ),
        React.createElement("div",{style:{display:"flex",gap:8}},
          React.createElement("button",{onClick:saveEditTaskFinal,style:{background:th.accent,color:th.accentText,border:"none",borderRadius:8,padding:"10px 22px",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:12,cursor:"pointer",flex:1}},"Save changes"),
          React.createElement("button",{onClick:function(){setEditTask(null);},style:{background:th.surface2,border:"1px solid "+th.border,borderRadius:8,padding:"10px 16px",color:th.textSub,cursor:"pointer",fontFamily:"inherit",fontSize:12}},"Cancel")
        )
      )
    );
  }

  // ─── Recurring Choice Modal ──────────────────────────────────────────────
  function RecurringModal(){
    if(!recModal)return null;
    var isDelete=recModal.type==="delete";
    return React.createElement("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}},
      React.createElement("div",{style:{background:th.surface,border:"1px solid "+th.border,borderRadius:14,padding:"22px",width:"100%",maxWidth:400,boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}},
        React.createElement("div",{style:{fontSize:20,textAlign:"center",marginBottom:10}},"🔁"),
        React.createElement("div",{style:{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800,color:th.text,textAlign:"center",marginBottom:6}},isDelete?"Delete recurring task":"Edit recurring task"),
        React.createElement("div",{style:{fontSize:12,color:th.textMuted,textAlign:"center",marginBottom:20,lineHeight:1.5}},
          "\u201c"+recModal.task.title+"\u201d is a recurring task. What would you like to "+(isDelete?"delete":"edit")+"?"
        ),
        React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:8}},
          React.createElement("button",{onClick:function(){handleRecurringChoice("one");},style:{background:th.surface2,border:"1px solid "+th.border,borderRadius:9,padding:"13px 16px",cursor:"pointer",textAlign:"left",transition:"all 0.15s"}},
            React.createElement("div",{style:{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:th.text,marginBottom:2}},"Just this occurrence"),
            React.createElement("div",{style:{fontSize:11,color:th.textMuted}},isDelete?"Remove only this task, keep future ones":"Edit only this one task")
          ),
          React.createElement("button",{onClick:function(){handleRecurringChoice("all");},style:{background:isDelete?th.redBg:th.accentSub,border:"1px solid "+(isDelete?th.red:th.accent)+"44",borderRadius:9,padding:"13px 16px",cursor:"pointer",textAlign:"left",transition:"all 0.15s"}},
            React.createElement("div",{style:{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:isDelete?th.red:th.accent,marginBottom:2}},"All future occurrences"),
            React.createElement("div",{style:{fontSize:11,color:th.textMuted}},isDelete?"Remove this and all future recurring tasks":"Apply changes to all future occurrences")
          ),
          React.createElement("button",{onClick:function(){setRecModal(null);},style:{background:"none",border:"none",color:th.textMuted,cursor:"pointer",fontSize:11,padding:"8px",fontFamily:"inherit"}},"Cancel")
        )
      )
    );
  }


  // ─── Google Calendar iCal integration ──────────────────────────────────────
  function parseIcalDate(val){
    val=(val||"").split(";")[0].split(":").slice(-1)[0].trim();
    var Z=val.endsWith("Z");
    val=val.replace("Z","");
    if(val.includes("T")){
      var y=val.slice(0,4),mo=val.slice(4,6),d=val.slice(6,8),h=val.slice(9,11),mi=val.slice(11,13);
      var dt=new Date(y+"-"+mo+"-"+d+"T"+h+":"+mi+":00"+(Z?"Z":""));
      return dt;
    } else {
      var y2=val.slice(0,4),mo2=val.slice(4,6),d2=val.slice(6,8);
      return new Date(y2+"-"+mo2+"-"+d2+"T00:00:00");
    }
  }

  function parseIcal(text){
    var events=[];
    // Unfold lines and normalize line endings
    var raw=text;
    raw=raw.split("\r\n").join("\n").split("\r").join("\n");
    // Unfold continuation lines (lines starting with space/tab)
    var unfolded="";
    var ls=raw.split("\n");
    for(var x=0;x<ls.length;x++){
      if(x>0&&(ls[x].charAt(0)===" "||ls[x].charAt(0)==="\t")){
        unfolded+=ls[x].slice(1);
      } else {
        if(x>0)unfolded+="\n";
        unfolded+=ls[x];
      }
    }
    var lines=unfolded.split("\n");
    var inEv=false; var ev={};
    for(var i=0;i<lines.length;i++){
      var ln=lines[i];
      if(ln==="BEGIN:VEVENT"){inEv=true;ev={};}
      else if(ln==="END:VEVENT"){
        if(ev.title&&ev.startDate){events.push(ev);}
        inEv=false;
      } else if(inEv){
        var colon=ln.indexOf(":");
        if(colon<0)continue;
        var key=ln.slice(0,colon).split(";")[0].toUpperCase();
        var val=ln.slice(colon+1);
        if(key==="SUMMARY") ev.title=val;
        else if(key==="DTSTART"){ev.startDate=parseIcalDate(ln);ev.allDay=!ln.includes("T");}
        else if(key==="DTEND") ev.endDate=parseIcalDate(ln);
        else if(key==="DESCRIPTION") ev.description=val.replace(/\\n/g," ").slice(0,100);
        else if(key==="LOCATION") ev.location=val.slice(0,80);
      }
    }
    return events;
  }

  function dkFromDate(d){
    return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
  }

  async function fetchGoogleCalendar(){
    var url=settings.gcalUrl;
    if(!url||!url.includes("calendar.google.com"))return;
    setGcalLoading(true);setGcalErr("");
    try{
      var r=await fetch("/api/calendar?url="+encodeURIComponent(url));
      if(!r.ok)throw new Error("HTTP "+r.status);
      var text=await r.text();
      var parsed=parseIcal(text);
      setGcalEvents(parsed);
    }catch(e){
      setGcalErr("Could not load calendar. Check your iCal URL in Settings.");
    }
    setGcalLoading(false);
  }

  useEffect(function(){if(loaded&&settings.gcalUrl)fetchGoogleCalendar();},[loaded,settings.gcalUrl]);

  var homeBodyFont = (HOME_FONT_OPTIONS[homeSettings.homeFont]||HOME_FONT_OPTIONS.nunito).css;
  var css = "@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;600;700;800&family=Nunito:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=Lato:wght@300;400;700&display=swap');\n*{box-sizing:border-box;margin:0;padding:0}\n::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:"+th.surface2+"}::-webkit-scrollbar-thumb{background:"+th.border+";border-radius:4px}\n.hov:hover{background:"+th.surface2+" !important}\n.nb{transition:all 0.15s;cursor:pointer;border:none}.nb:hover{opacity:0.8}\n.ck{cursor:pointer}.ck:hover{transform:scale(1.1)}\ninput:focus,select:focus,textarea:focus{border-color:"+th.accent+" !important;box-shadow:0 0 0 3px "+th.accent+"18}\n@keyframes fu{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}.fu{animation:fu 0.25s ease forwards}\n@keyframes aiDot{0%,100%{opacity:0.3;transform:scale(0.75)}50%{opacity:1;transform:scale(1)}}\n@keyframes pp{0%{box-shadow:0 0 0 0 "+th.accent+"44}70%{box-shadow:0 0 0 14px transparent}100%{box-shadow:0 0 0 0 transparent}}\n.pa{animation:pp 2s infinite}\n.gc{transition:all 0.16s;cursor:pointer}.gc:hover{transform:translateY(-2px)}\n@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}\n.shimmer{background:linear-gradient(90deg,"+th.surface+" 25%,"+th.surface2+" 50%,"+th.surface+" 75%);background-size:200% 100%;animation:shimmer 1.4s infinite}\n.mb{cursor:pointer;border:none;background:none}.mb:hover{transform:scale(1.2)}@keyframes spin{to{transform:rotate(360deg)}}" + (appMode==="home" ? ".home-mode,.home-mode *{font-family:"+homeBodyFont+" !important}" : "");

  return (
    <div className={appMode==="home"?"home-mode":""} style={{minHeight:"100vh",background:th.bg,fontFamily:"'DM Mono','Fira Mono',monospace",color:th.text}}>
      <style>{css}</style>
      <EditTaskModal/>
      <RecurringModal/>
      {!loaded&&React.createElement("div",{style:{position:"fixed",inset:0,background:th.bg,zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:12}},
        React.createElement("div",{style:{width:40,height:40,border:"3px solid "+th.border,borderTop:"3px solid "+th.accent,borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),
        React.createElement("div",{style:{fontSize:12,color:th.textMuted,fontFamily:"'Syne',sans-serif"}}, "Loading your data...")
      )}

      {/* Header */}
      <div style={{background:th.headerBg,borderBottom:"1px solid "+th.headerBorder,padding:"16px 16px 12px",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 12px "+th.shadow}}>
        <div style={{maxWidth:940,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12,flexWrap:"wrap",gap:8}}>
            <div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:10,letterSpacing:"0.18em",color:th.headerSub,textTransform:"uppercase",marginBottom:2}}>{settings.name?settings.name+" - ":""}{settings.school||"Head of Science"}</div>
              <div style={{display:"flex",justifyContent:"center",marginTop:6}}>
                <div style={{display:"flex",background:"rgba(255,255,255,0.15)",borderRadius:20,padding:3,gap:2}}>
                  <button onClick={function(){switchMode("work");}} style={{background:appMode==="work"?"white":"transparent",color:appMode==="work"?"#1E3A8A":"rgba(255,255,255,0.8)",border:"none",borderRadius:16,padding:"4px 11px",fontSize:11,fontFamily:"'Syne',sans-serif",fontWeight:700,cursor:"pointer",transition:"all 0.2s",letterSpacing:"0.05em"}}>&#128188; Work</button>
                  <button onClick={function(){switchMode("cal");}} style={{background:appMode==="cal"?"white":"transparent",color:appMode==="cal"?"#1E293B":"rgba(255,255,255,0.8)",border:"none",borderRadius:16,padding:"4px 11px",fontSize:10,fontFamily:"'Syne',sans-serif",fontWeight:700,cursor:"pointer",transition:"all 0.2s"}}>&#128197; Calendar</button>
                  <button onClick={function(){switchMode("home");}} style={{background:appMode==="home"?"white":"transparent",color:appMode==="home"?"#1A3A08":"rgba(255,255,255,0.8)",border:"none",borderRadius:16,padding:"4px 11px",fontSize:11,fontFamily:"'Syne',sans-serif",fontWeight:700,cursor:"pointer",transition:"all 0.2s",letterSpacing:"0.05em"}}>&#127968; Home</button>
                </div>
              </div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:th.headerText,letterSpacing:"-0.02em"}}>{(function(){var d=new Date();var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var months=["January","February","March","April","May","June","July","August","September","October","November","December"];return days[d.getDay()]+", "+d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();})()}</div>
            </div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"flex-end"}}>
              {[
                {n:pending.length,sub:"pending",bg:th.navActive+"22",col:th.navActive||th.accent},
                overdueTasks.length?{n:overdueTasks.length,sub:"overdue",bg:th.red+"22",col:th.red}:null,
                {n:tasks.filter(function(t){return t.done;}).length,sub:"done",bg:th.green+"22",col:th.green},
                pomo.sessions>0?{n:pomo.sessions,sub:"🍅 today",bg:th.amber+"22",col:th.amber}:null,
              ].filter(Boolean).map(function(s,i){
                return React.createElement("div",{key:i,style:{background:s.bg,border:"1px solid "+s.col+"44",borderRadius:8,padding:"5px 12px",textAlign:"center",minWidth:50}},
                  React.createElement("div",{style:{fontSize:17,fontWeight:700,color:s.col,fontFamily:"'Syne',sans-serif",lineHeight:1}},s.n),
                  React.createElement("div",{style:{fontSize:9,color:s.col,letterSpacing:"0.07em",textTransform:"uppercase",opacity:0.8,marginTop:1}},s.sub)
                );
              })}
            </div>
          </div>
          {appMode!=="cal"&&<div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
            {NAV.map(function(v){
              return (
                <button key={v.id} className="nb" onClick={function(){setView(v.id);}} style={{background:view===v.id?th.navActive:th.navInactive,color:view===v.id?th.navActiveTxt:th.navInactiveTxt,border:"1px solid "+(view===v.id?th.navActive:th.navBorder),borderRadius:6,padding:"5px 10px",fontSize:10,fontFamily:"'DM Mono',monospace",fontWeight:view===v.id?500:400,letterSpacing:"0.04em"}}>{v.label}</button>
              );
            })}
          </div>}
        </div>
      </div>

      <div style={{maxWidth:940,margin:"0 auto",padding:"18px 14px"}}>

        {/* FOCUS */}
        {appMode==="work"&&view==="focus"&&(
          <div className="fu">
            {showHtWarn&&(
              <div style={{background:th.amberBg,border:"1px solid "+th.amber+"44",borderRadius:10,padding:"10px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:10}}>
                <span>📅</span>
                <div style={{fontSize:12,color:th.amber,fontFamily:"'Syne',sans-serif",fontWeight:600}}>{htDays===0?"Half term starts today!":htDays===1?"Half term tomorrow!":"Half term in "+htDays+" days"} -- {settings.termName}{unscheduled.length>0?". "+unscheduled.length+" tasks unscheduled.":""}</div>
              </div>
            )}
            <div style={{background:th.accentSub,border:"1.5px solid "+th.accent+"33",borderRadius:10,padding:"12px 14px",marginBottom:16}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:700,color:th.accent,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:8}}>🧠 Brain Dump</div>
              <div style={{display:"flex",gap:7,marginBottom:dumpItems.length?8:0}}>
                <input type="text" value={dumpInput} placeholder="Type anything... press Enter" onChange={function(e){setDumpInput(e.target.value);}} onKeyDown={function(e){if(e.key==="Enter")addDump();}} style={inpSt({flex:1,padding:"7px 12px",fontSize:12})}/>
                <button onClick={addDump} style={{background:th.accent,border:"none",borderRadius:8,color:th.accentText,padding:"0 14px",cursor:"pointer",fontSize:14,fontWeight:700}}>+</button>
              </div>
              {dumpItems.map(function(item){
                return (
                  <div key={item.id} style={{background:th.surface,border:"1px solid "+th.border,borderRadius:6,padding:"4px 10px",display:"inline-flex",alignItems:"center",gap:7,margin:"0 5px 5px 0"}}>
                    <span style={{fontSize:11,color:th.text}}>{item.text}</span>
                    <span style={{fontSize:9,color:th.textMuted}}>{item.ts}</span>
                    <button onClick={function(){dumpToTask(item);}} style={{background:"none",border:"none",color:th.accent,cursor:"pointer",fontSize:10,padding:0,fontWeight:700}}>&gt; task</button>
                    <button onClick={function(){setDumpItems(function(d){return d.filter(function(x){return x.id!==item.id;});});}} style={{background:"none",border:"none",color:th.textMuted,cursor:"pointer",fontSize:11,padding:0}}>x</button>
                  </div>
                );
              })}
            </div>
            <div style={{marginBottom:12}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:th.textSub,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:2}}>Your next 3 priorities</div>
              <div style={{fontSize:11,color:th.textMuted}}>{"~"+focusTasks.reduce(function(s,t){return s+t.estimatedMins;},0)+" mins · auto-ranked"}</div>
            </div>
            {focusTasks.length===0&&<div style={{textAlign:"center",padding:"50px",color:th.textMuted}}><div style={{fontSize:32,marginBottom:8}}>✓</div><div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700}}>All clear.</div></div>}
            {focusTasks.map(function(task,i){
              var cat=CATS[task.category],pri=PRIS[task.priority],due=formatDue(task.dueDate);
              return (
                <div key={task.id} className="fu" style={{background:i===0?cat.color+"08":th.surface,border:"1px solid "+(i===0?cat.color+"44":th.border),borderLeft:"3px solid "+cat.color,borderRadius:10,padding:"14px 16px",marginBottom:10,position:"relative",boxShadow:"0 2px 8px "+th.shadow}}>
                  {i===0&&<div style={{position:"absolute",top:10,right:12,fontSize:9,letterSpacing:"0.1em",color:th.accent,background:th.accentSub,border:"1px solid "+th.accent+"44",borderRadius:4,padding:"2px 7px",fontWeight:600}}>DO FIRST</div>}
                  <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                    <button className="ck" onClick={function(){toggleDone(task.id);}} style={{background:"none",border:"2px solid "+cat.color,borderRadius:"50%",width:20,height:20,minWidth:20,marginTop:1,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:cat.color,fontSize:11}}></button>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14,fontWeight:700,color:th.text,fontFamily:"'Syne',sans-serif",marginBottom:6}}>{task.title}{task.recurring?<span style={{marginLeft:5,fontSize:10,color:th.accent}}>🔁</span>:null}</div>
                      <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
                        <span style={badge(cat.color+"18",cat.color,cat.color+"44")}>{cat.icon} {cat.label}</span>
                        <span style={badge(pri.color+"18",pri.color,pri.color+"44")}>{pri.label}</span>
                        <span style={{fontSize:11,color:due.color,fontWeight:500}}>{due.text}</span>
                        <span style={{fontSize:11,color:th.textMuted}}>{"~"+task.estimatedMins+"m"}</span>
                        <button onClick={function(){setPomo(function(p){return Object.assign({},p,{taskId:task.id,mode:"idle",timeLeft:POMO_WORK,totalTime:POMO_WORK,running:false});});setView("timer");}} style={{background:th.amberBg,border:"1px solid "+th.amber+"44",borderRadius:4,color:th.amber,fontSize:10,padding:"2px 8px",cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>🍅 Focus</button>
                        <button onClick={function(){requestEditTask(task);}} style={{background:th.accentSub,border:"1px solid "+th.accent+"44",borderRadius:4,color:th.accent,fontSize:10,padding:"2px 8px",cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>✏ Edit</button>
                      </div>
                      {task.notes&&<div style={{marginTop:6,fontSize:11,color:th.textMuted,fontStyle:"italic"}}>{task.notes}</div>}
                    </div>
                  </div>
                </div>
              );
            })}
            <div style={card({marginTop:18})}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:10,letterSpacing:"0.13em",textTransform:"uppercase",color:th.textMuted,marginBottom:10}}>📊 Workload by area</div>
              <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                {Object.keys(CATS).map(function(key){var cat=CATS[key],count=pending.filter(function(t){return t.category===key;}).length;if(!count)return null;return(React.createElement("div",{key:key,onClick:function(){setView("all");setFilterCat(key);},style:{cursor:"pointer",background:cat.color+"12",border:"1px solid "+cat.color+"33",borderRadius:8,padding:"7px 12px",display:"flex",alignItems:"center",gap:7}},React.createElement("span",{style:{fontSize:14}},cat.icon),React.createElement("div",null,React.createElement("div",{style:{fontSize:16,fontWeight:700,color:cat.color,fontFamily:"'Syne',sans-serif",lineHeight:1}},count),React.createElement("div",{style:{fontSize:9,color:th.textMuted,marginTop:1}},cat.label))));})  }
              </div>
              {pending.length>=8&&<div style={{marginTop:10,fontSize:11,color:th.amber,background:th.amberBg,border:"1px solid "+th.amber+"44",borderRadius:6,padding:"8px 12px"}}>Heavy load - consider delegating or rescheduling lower-priority tasks.</div>}
            </div>
          </div>
        )}

        {/* PLANNER */}
        {appMode==="work"&&view==="planner"&&(
          <div className="fu">
            <div style={{marginBottom:14}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:th.textSub,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:2}}>Week Planner - w/c 25 May</div><div style={{fontSize:11,color:th.textMuted}}>Click a task then click a day to schedule it</div></div>
            {planDrag&&<div style={{background:th.accentSub,border:"1px solid "+th.accent+"55",borderRadius:8,padding:"9px 14px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:12,color:th.accent,fontWeight:600}}>Click a day to place: "{planDrag.title}"</span><button onClick={function(){setPlanDrag(null);}} style={{background:"none",border:"none",color:th.accent,cursor:"pointer",fontSize:16}}>x</button></div>}
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,marginBottom:16}}>
              {WDAYS.map(function(day){
                var dt=tasks.filter(function(t){return t.scheduledDay===day.key;}),mins=dt.reduce(function(s,t){return s+t.estimatedMins;},0);
                var lc=mins===0?th.border:mins<=60?th.green:mins<=120?th.amber:th.red;
                return (
                  <div key={day.key} onClick={function(){if(planDrag){scheduleTask(planDrag.id,day.key);setPlanDrag(null);}}} style={{background:planDrag?th.accentSub:th.surface,border:"1.5px solid "+(planDrag?th.accent:th.border),borderRadius:10,padding:"9px 8px",cursor:planDrag?"pointer":"default",minHeight:160,boxShadow:"0 2px 8px "+th.shadow}}>
                    <div style={{marginBottom:7,paddingBottom:6,borderBottom:"1px solid "+th.border}}>
                      <div style={{fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:700,color:th.textSub}}>{day.key}</div>
                      <div style={{fontSize:9,color:th.textMuted,marginBottom:4}}>{day.label}</div>
                      <div style={{height:3,background:th.border,borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",width:Math.min(100,(mins/180)*100)+"%",background:lc,borderRadius:2}}/></div>
                      <div style={{fontSize:9,color:lc,marginTop:2,fontWeight:600}}>{mins+"m"}</div>
                    </div>
                    {dt.length===0&&<div style={{fontSize:10,color:th.textMuted,textAlign:"center",paddingTop:12}}>{planDrag?"drop here":"-"}</div>}
                    {dt.map(function(t){return <TaskChip key={t.id} task={t} onToggle={toggleDone} onUnschedule={unscheduleTask} compact={true} th={th}/>;  })}
                  </div>
                );
              })}
            </div>
            <div style={card({marginBottom:14})}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:700,color:th.textMuted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10}}>Unscheduled ({unscheduled.length}) - click to assign</div>
              {unscheduled.length===0&&<div style={{fontSize:11,color:th.green,fontWeight:600}}>All tasks scheduled!</div>}
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {unscheduled.map(function(task){var cat=CATS[task.category],sel=planDrag&&planDrag.id===task.id;return(React.createElement("div",{key:task.id,onClick:function(){setPlanDrag(sel?null:task);},style:{background:sel?cat.color+"18":th.surface2,border:"1px solid "+(sel?cat.color:cat.color+"33"),borderRadius:7,padding:"6px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:7}},React.createElement("span",{style:{fontSize:13}},cat.icon),React.createElement("div",null,React.createElement("div",{style:{fontSize:11,color:sel?cat.color:th.text,fontFamily:"'Syne',sans-serif",fontWeight:600}},task.title),React.createElement("div",{style:{fontSize:9,color:th.textMuted}},PRIS[task.priority].label+" · ~"+task.estimatedMins+"m"))));  })}
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
              {[{label:"Total planned",val:tasks.filter(function(t){return t.scheduledDay;}).reduce(function(s,t){return s+t.estimatedMins;},0)+"m",col:th.accent},{label:"Scheduled",val:tasks.filter(function(t){return t.scheduledDay&&!t.done;}).length,col:th.green},{label:"Unscheduled",val:unscheduled.length,col:unscheduled.length>3?th.amber:th.green}].map(function(s,i){return React.createElement("div",{key:i,style:card({textAlign:"center"})},React.createElement("div",{style:{fontSize:22,fontWeight:700,color:s.col,fontFamily:"'Syne',sans-serif"}},s.val),React.createElement("div",{style:{fontSize:9,color:th.textMuted,marginTop:2}},s.label));  })}
            </div>
          </div>
        )}

        {/* ALL TASKS */}
        {appMode==="work"&&view==="all"&&(
          <div className="fu">
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12,alignItems:"center"}}>
              <button className="nb" onClick={function(){setFilterCat("all");}} style={{background:filterCat==="all"?th.accent:th.surface2,color:filterCat==="all"?th.accentText:th.textSub,border:"1px solid "+(filterCat==="all"?th.accent:th.border),borderRadius:6,padding:"5px 12px",fontSize:11,fontFamily:"inherit"}}>All</button>
              {Object.keys(CATS).map(function(key){var cat=CATS[key];return(<button key={key} className="nb" onClick={function(){setFilterCat(key);}} style={{background:filterCat===key?cat.color+"18":th.surface2,color:filterCat===key?cat.color:th.textSub,border:"1px solid "+(filterCat===key?cat.color+"55":th.border),borderRadius:6,padding:"5px 12px",fontSize:11,fontFamily:"inherit"}}>{cat.icon} {cat.label}</button>);})}
              <label style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:5,fontSize:11,color:th.textMuted,cursor:"pointer"}}><input type="checkbox" checked={showDone} onChange={function(e){setShowDone(e.target.checked);}} style={{accentColor:th.accent}}/>Show done</label>
            </div>
            {sortedTasks.length===0&&<div style={{textAlign:"center",padding:"60px",color:th.textMuted}}>No tasks here.</div>}
            {sortedTasks.map(function(task){
              var cat=CATS[task.category],pri=PRIS[task.priority],due=formatDue(task.dueDate),exp=expandedId===task.id;
              return(
                <div key={task.id} className="hov" style={{background:th.surface,border:"1px solid "+th.border,borderLeft:"3px solid "+(task.done?"#D1D5DB":cat.color),borderRadius:8,marginBottom:7,overflow:"hidden",opacity:task.done?0.6:1,boxShadow:"0 1px 4px "+th.shadow}}>
                  <div style={{padding:"11px 14px",display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={function(){setExpandedId(exp?null:task.id);}}>
                    <button className="ck" onClick={function(e){e.stopPropagation();toggleDone(task.id);}} style={{background:task.done?cat.color:"none",border:"2px solid "+cat.color,borderRadius:"50%",width:18,height:18,minWidth:18,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:10,cursor:"pointer"}}>{task.done?"✓":""}</button>
                    <div style={{flex:1,minWidth:0}}><div style={{fontSize:12,color:task.done?th.textMuted:th.text,fontFamily:"'Syne',sans-serif",fontWeight:600,textDecoration:task.done?"line-through":"none"}}>{task.title}{task.recurring?<span style={{marginLeft:4,fontSize:9,color:th.accent}}>🔁</span>:null}</div></div>
                    <div style={{display:"flex",gap:5,alignItems:"center",flexShrink:0}}>
                      <span style={badge(pri.color+"18",pri.color,pri.color+"44")}>{pri.label}</span>
                      <span style={{fontSize:10,color:due.color,minWidth:55,textAlign:"right",fontWeight:500}}>{due.text}</span>
                      {task.scheduledDay&&<span style={{fontSize:9,color:th.accent,background:th.accentSub,border:"1px solid "+th.accent+"44",borderRadius:3,padding:"1px 5px"}}>{task.scheduledDay}</span>}
                      <span style={{fontSize:13,color:th.textMuted}}>{exp?"▲":"▼"}</span>
                    </div>
                  </div>
                  {exp&&(
                    <div className="fu" style={{borderTop:"1px solid "+th.border,padding:"10px 14px",background:th.surface2}}>
                      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
                        <span style={badge(cat.color+"18",cat.color,cat.color+"44")}>{cat.icon} {cat.label}</span>
                        <span style={{fontSize:10,color:th.textMuted}}>{"~"+task.estimatedMins+"m · "+task.dueDate}</span>
                        {task.recurring&&<span style={badge(th.accentSub,th.accentSubTxt,th.accent+"33")}>{REC_LABELS[task.recurring]}</span>}
                      </div>
                      {task.notes&&<div style={{fontSize:11,color:th.textMuted,fontStyle:"italic",marginBottom:8}}>{task.notes}</div>}
                      <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                        <button onClick={function(){requestEditTask(task);}} style={{background:"none",border:"1px solid "+th.accent+"55",borderRadius:5,color:th.accent,fontSize:10,padding:"3px 10px",cursor:"pointer",fontFamily:"inherit"}}>✏ Edit</button>
                        <button onClick={function(){requestDeleteTask(task);}} style={{background:"none",border:"1px solid "+th.red+"55",borderRadius:5,color:th.red,fontSize:10,padding:"3px 10px",cursor:"pointer",fontFamily:"inherit"}}>🗑 Delete</button>
                        <button onClick={function(){setAiInput("Help me with: '"+task.title+"'. "+(task.notes||""));setView("ai");}} style={{background:"none",border:"1px solid "+th.accent+"55",borderRadius:5,color:th.accent,fontSize:10,padding:"3px 10px",cursor:"pointer",fontFamily:"inherit"}}>🤖 AI help</button>
                        <button onClick={function(){setPomo(function(p){return Object.assign({},p,{taskId:task.id,mode:"idle",timeLeft:POMO_WORK,totalTime:POMO_WORK,running:false});});setView("timer");}} style={{background:"none",border:"1px solid "+th.amber+"55",borderRadius:5,color:th.amber,fontSize:10,padding:"3px 10px",cursor:"pointer",fontFamily:"inherit"}}>🍅 Focus</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TIMER */}
        {appMode==="work"&&view==="timer"&&(
          <div className="fu">
            <div style={{marginBottom:16}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:th.textSub,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:2}}>Pomodoro Focus Timer</div><div style={{fontSize:11,color:th.textMuted}}>{settings.pomoWork+" min focus · "+settings.pomoBreak+" min break · Long break after 4 sessions"}</div></div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
              <div style={{width:"100%",maxWidth:400}}>
                <label style={lblSt()}>Working on</label>
                <select value={pomo.taskId||""} onChange={function(e){var id=parseInt(e.target.value)||null;setPomo(function(p){return Object.assign({},p,{taskId:id,mode:"idle",timeLeft:POMO_WORK,totalTime:POMO_WORK,running:false});});}} style={selSt()}>
                  <option value="">-- Select a task --</option>
                  {pending.map(function(t){return <option key={t.id} value={t.id}>{CATS[t.category].icon} {t.title} (~{t.estimatedMins}m)</option>;})}
                </select>
              </div>
              <div className={pomo.running?"pa":""} style={{borderRadius:"50%",padding:8,background:th.surface,boxShadow:"0 4px 20px "+th.shadow}}>
                <CircleTimer timeLeft={pomo.timeLeft} totalTime={pomo.totalTime} mode={pomo.mode} th={th}/>
              </div>
              {pomo.mode!=="idle"&&(
                <div style={{maxWidth:360,textAlign:"center",fontSize:12,lineHeight:1.5,fontFamily:"'Syne',sans-serif",fontWeight:600,color:{work:th.accent,break:th.green,longBreak:"#8B5CF6"}[pomo.mode],background:{work:th.accentSub,break:th.greenBg,longBreak:"#F3E8FF"}[pomo.mode],border:"1px solid "+({work:th.accent,break:th.green,longBreak:"#8B5CF6"}[pomo.mode])+"33",borderRadius:10,padding:"10px 16px"}}>
                  {pomo.mode==="work"&&("Focused on: \""+(pomoTask?pomoTask.title:"your task")+"\"")}
                  {pomo.mode==="break"&&"Short break - step away from the screen"}
                  {pomo.mode==="longBreak"&&"Long break - you have earned it!"}
                </div>
              )}
              <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"}}>
                <button onClick={function(){setPomo(function(p){return Object.assign({},p,{running:!p.running});});}} disabled={!pomo.taskId&&pomo.mode==="idle"} style={{background:pomo.running?th.amberBg:th.accent,color:pomo.running?th.amber:th.accentText,border:pomo.running?"1px solid "+th.amber:"none",borderRadius:10,padding:"12px 32px",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:14,cursor:(!pomo.taskId&&pomo.mode==="idle")?"not-allowed":"pointer",opacity:(!pomo.taskId&&pomo.mode==="idle")?0.4:1,boxShadow:pomo.running?"none":"0 4px 12px "+th.shadow}}>{pomo.running?"Pause":"Start"}</button>
                <button onClick={function(){setPomo(function(p){return Object.assign({},p,{running:false,mode:"idle",timeLeft:POMO_WORK,totalTime:POMO_WORK});});}} style={{background:th.surface2,border:"1px solid "+th.border,borderRadius:10,padding:"12px 20px",color:th.textSub,cursor:"pointer",fontSize:12}}>Reset</button>
                {(pomo.mode==="break"||pomo.mode==="longBreak")&&<button onClick={function(){setPomo(function(p){return Object.assign({},p,{running:false,mode:"work",timeLeft:POMO_WORK,totalTime:POMO_WORK});});}} style={{background:th.accentSub,border:"1px solid "+th.accent+"44",borderRadius:10,padding:"12px 20px",color:th.accent,cursor:"pointer",fontSize:12}}>Skip break</button>}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,width:"100%",maxWidth:400}}>
                {[{label:"Sessions",val:pomo.sessions,col:th.amber,icon:"🍅"},{label:"Focus time",val:pomo.focusMins+"m",col:th.accent,icon:"⏱"},{label:"To long break",val:(4-(pomo.sessions%4)===0?4:4-(pomo.sessions%4))+" left",col:"#8B5CF6",icon:"🛋"}].map(function(s,i){return React.createElement("div",{key:i,style:card({textAlign:"center",padding:"10px 8px"})},React.createElement("div",{style:{fontSize:8,color:th.textMuted,marginBottom:3,letterSpacing:"0.06em"}},s.icon+" "+s.label.toUpperCase()),React.createElement("div",{style:{fontSize:18,fontWeight:700,color:s.col,fontFamily:"'Syne',sans-serif"}},s.val));  })}
              </div>
            </div>
          </div>
        )}

        {/* AUTOMATE */}
        {appMode==="work"&&view==="automate"&&(
          <div className="fu">
            <div style={{marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,flexWrap:"wrap"}}>
              <div><div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:th.textSub,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:2}}>One-Click Generators</div><div style={{fontSize:11,color:th.textMuted}}>Fill 2-4 fields, Generate, Copy</div></div>
              <button onClick={function(){setShowSuggest(function(s){return !s;});setSuggestResult(null);setSelGen(null);setGenOutput("");}} style={{background:showSuggest?th.green:th.greenBg,color:showSuggest?"white":th.green,border:"1.5px solid "+th.green,borderRadius:8,padding:"7px 14px",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
                <span>💡</span><span>{showSuggest?"Close":"Suggest automation"}</span>
              </button>
            </div>
            {showSuggest&&(
              <div className="fu" style={{background:th.greenBg,border:"1.5px solid "+th.green+"44",borderRadius:12,padding:"16px",marginBottom:16}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:th.green,marginBottom:10}}>💡 Suggest an Automation</div>
                <div style={{marginBottom:10}}><label style={lblSt({color:th.green})}>What to automate?</label><textarea value={suggestInput} onChange={function(e){setSuggestInput(e.target.value);}} placeholder="e.g. A letter explaining a student exclusion" rows={2} style={inpSt({resize:"vertical",fontSize:12})}/></div>
                <div style={{marginBottom:12}}><label style={lblSt({color:th.green})}>Category</label><div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{GEN_TABS.map(function(tab){return(<button key={tab.key} className="nb" onClick={function(){setSuggestCat(tab.key);}} style={{background:suggestCat===tab.key?tab.color+"18":th.surface,color:suggestCat===tab.key?tab.color:th.textSub,border:"1px solid "+(suggestCat===tab.key?tab.color:th.border),borderRadius:6,padding:"4px 10px",fontSize:10,fontFamily:"inherit"}}>{tab.icon} {tab.label}</button>);})}</div></div>
                <button onClick={submitSuggestion} disabled={!suggestInput.trim()||suggestLoading} style={{background:suggestInput.trim()&&!suggestLoading?th.green:th.border,color:suggestInput.trim()&&!suggestLoading?"white":th.textMuted,border:"none",borderRadius:8,padding:"10px 20px",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:12,cursor:suggestInput.trim()&&!suggestLoading?"pointer":"default",display:"flex",alignItems:"center",gap:7,marginBottom:suggestResult?12:0}}>
                  {suggestLoading?<span>Checking...</span>:<span>Check if possible</span>}
                </button>
                {suggestResult&&(
                  <div ref={suggestRef} className="fu" style={{borderRadius:10,overflow:"hidden",border:"1px solid "+(suggestResult.feasible?th.green:th.red)+"55"}}>
                    <div style={{padding:"12px 14px",background:suggestResult.feasible?th.greenBg:th.redBg,display:"flex",alignItems:"flex-start",gap:10}}>
                      <span style={{fontSize:18,flexShrink:0}}>{suggestResult.feasible?"✅":"❌"}</span>
                      <div><div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:suggestResult.feasible?th.green:th.red,marginBottom:2}}>{suggestResult.feasible?"Yes - I can automate this!":"Not possible - here is why"}</div><div style={{fontSize:11,color:th.textSub,lineHeight:1.5}}>{suggestResult.reason}</div></div>
                    </div>
                    {suggestResult.feasible&&suggestResult.generator&&(
                      <div style={{padding:"12px 14px",background:th.surface}}>
                        <div style={{background:th.surface2,border:"1px solid "+GENS[suggestCat].color+"44",borderRadius:8,padding:"10px 12px",marginBottom:10}}>
                          <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:GENS[suggestCat].color,marginBottom:3}}>{suggestResult.generator.title}</div>
                          <div style={{fontSize:11,color:th.textMuted}}>{suggestResult.generator.desc}</div>
                        </div>
                        <div style={{display:"flex",gap:8}}><button onClick={addCustomGen} style={{background:th.green,color:"white",border:"none",borderRadius:8,padding:"9px 18px",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:11,cursor:"pointer"}}>+ Add to {GENS[suggestCat].label}</button><button onClick={function(){setSuggestResult(null);setSuggestInput("");}} style={{background:"none",border:"1px solid "+th.border,borderRadius:8,padding:"9px 14px",color:th.textMuted,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>Discard</button></div>
                      </div>
                    )}
                    {!suggestResult.feasible&&(
                      <div style={{padding:"12px 14px",background:th.surface}}>
                        <div style={{fontSize:11,color:th.textMuted,marginBottom:8}}>The AI tab handles more open-ended requests and may still help.</div>
                        <button onClick={function(){setAiInput(suggestInput);setView("ai");setShowSuggest(false);setSuggestResult(null);setSuggestInput("");}} style={{background:th.accentSub,border:"1px solid "+th.accent+"44",borderRadius:8,padding:"7px 14px",color:th.accent,fontSize:11,cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>Try in AI chat</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            <div style={{display:"flex",gap:5,marginBottom:14,flexWrap:"wrap"}}>
              {GEN_TABS.map(function(tab){var tot=GENS[tab.key].items.length+(customGens[tab.key]?customGens[tab.key].length:0);return(<button key={tab.key} className="nb" onClick={function(){setAutoTab(tab.key);setSelGen(null);setGenFields({});setGenOutput("");}} style={{background:autoTab===tab.key?tab.color+"18":th.surface2,color:autoTab===tab.key?tab.color:th.textSub,border:"2px solid "+(autoTab===tab.key?tab.color:tab.color+"33"),borderRadius:8,padding:"6px 10px",fontSize:11,fontFamily:"'DM Mono',monospace",letterSpacing:"0.03em",display:"flex",alignItems:"center",gap:5,fontWeight:autoTab===tab.key?600:400}}>
                <span style={{fontSize:13}}>{tab.icon}</span><span>{tab.label}</span>
                <span style={{background:autoTab===tab.key?tab.color+"22":th.border,color:autoTab===tab.key?tab.color:th.textMuted,borderRadius:10,padding:"1px 6px",fontSize:9}}>{tot}</span>
              </button>);})}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:10}}>
              {curGenItems.map(function(gen){var isSel=selGen&&selGen.id===gen.id;return(
                <div key={gen.id} className="gc" onClick={function(){selectGen(gen);}} style={{background:isSel?curGenCat.color+"12":th.surface,border:"1.5px solid "+(isSel?curGenCat.color:gen.custom?curGenCat.color+"55":curGenCat.color+"28"),borderRadius:10,padding:"12px 14px",boxShadow:"0 2px 6px "+th.shadow,position:"relative"}}>
                  {gen.custom&&<div style={{position:"absolute",top:8,right:8,display:"flex",gap:3}}><span style={{fontSize:8,color:curGenCat.color,background:curGenCat.color+"18",borderRadius:3,padding:"1px 5px"}}>CUSTOM</span><button onClick={function(e){e.stopPropagation();removeCustomGen(autoTab,gen.id);}} style={{background:"none",border:"none",color:th.textMuted,cursor:"pointer",fontSize:11,padding:0}}>x</button></div>}
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4,paddingRight:gen.custom?55:0}}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:isSel?curGenCat.color:th.text,lineHeight:1.3}}>{gen.title}</div>
                    <span style={{fontSize:14,color:curGenCat.color,opacity:isSel?1:0.4,transform:isSel?"rotate(90deg)":"none",transition:"transform 0.2s",flexShrink:0,marginLeft:5}}>›</span>
                  </div>
                  <div style={{fontSize:10,color:th.textMuted,marginBottom:7,lineHeight:1.4}}>{gen.desc}</div>
                  <div style={{display:"flex",gap:5}}>
                    <span style={{background:th.surface2,color:th.textMuted,borderRadius:4,padding:"2px 6px",fontSize:9}}>{gen.fields.length+" inputs"}</span>
                    <span style={{background:curGenCat.color+"18",color:curGenCat.color,borderRadius:4,padding:"2px 6px",fontSize:9}}>{"saves "+gen.saves}</span>
                  </div>
                </div>
              );})}
            </div>
            {selGen&&(
              <div className="fu" style={{background:th.surface,border:"1.5px solid "+curGenCat.color+"44",borderRadius:12,padding:"18px",boxShadow:"0 4px 20px "+th.shadow}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <div><div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:curGenCat.color}}>{curGenCat.icon+" "+selGen.title}</div><div style={{fontSize:11,color:th.textMuted,marginTop:2}}>Fill in the fields then Generate</div></div>
                  <button onClick={function(){setSelGen(null);setGenFields({});setGenOutput("");}} style={{background:th.surface2,border:"1px solid "+th.border,borderRadius:6,color:th.textMuted,fontSize:11,padding:"4px 10px",cursor:"pointer",fontFamily:"inherit"}}>Close</button>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:12}}>
                  {selGen.fields.map(function(f,fi){var isW=f.type==="textarea"||(selGen.fields.length%2!==0&&fi===selGen.fields.length-1);return(
                    <div key={f.key} style={{gridColumn:isW?"span 2":"span 1"}}>
                      <label style={lblSt()}>{f.label}</label>
                      {f.type==="select"?(
                        <select value={genFields[f.key]||""} onChange={function(e){var v=e.target.value;setGenFields(function(p){return Object.assign({},p,{[f.key]:v});});}} style={selSt({borderColor:genFields[f.key]?curGenCat.color+"66":th.border})}>
                          <option value="">-- Select --</option>
                          {(f.opts||[]).map(function(o){return <option key={o} value={o}>{o}</option>;})}
                        </select>
                      ):f.type==="textarea"?(
                        <textarea value={genFields[f.key]||""} onChange={function(e){var v=e.target.value;setGenFields(function(p){return Object.assign({},p,{[f.key]:v});});}} placeholder={f.ph} rows={3} style={inpSt({resize:"vertical",borderColor:genFields[f.key]?curGenCat.color+"66":th.border})}/>
                      ):(
                        <input type="text" value={genFields[f.key]||""} onChange={function(e){var v=e.target.value;setGenFields(function(p){return Object.assign({},p,{[f.key]:v});});}} placeholder={f.ph} style={inpSt({borderColor:genFields[f.key]?curGenCat.color+"66":th.border})}/>
                      )}
                    </div>
                  );})}
                </div>
                <button onClick={runGen} disabled={genLoading} style={{background:genLoading?th.surface2:curGenCat.color,color:genLoading?th.textMuted:"white",border:"none",borderRadius:8,padding:"11px 26px",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:12,letterSpacing:"0.07em",cursor:genLoading?"wait":"pointer",display:"flex",alignItems:"center",gap:8}}>
                  {genLoading?<span>Generating...</span>:<span>Generate</span>}
                </button>
                {genLoading&&!genOutput&&<div style={{marginTop:12}}>{[1,0.7,0.5].map(function(o,i){return <div key={i} className="shimmer" style={{height:14,borderRadius:4,marginBottom:6,opacity:o}}/>;})}</div>}
                {genOutput&&(
                  <div ref={outputRef} className="fu" style={{marginTop:12,background:th.surface2,border:"1px solid "+curGenCat.color+"33",borderRadius:10,overflow:"hidden"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderBottom:"1px solid "+curGenCat.color+"22",background:curGenCat.color+"08"}}>
                      <div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:7,height:7,borderRadius:"50%",background:curGenCat.color}}/><span style={{fontSize:10,color:curGenCat.color,letterSpacing:"0.09em",textTransform:"uppercase",fontWeight:600}}>Ready to copy</span></div>
                      <div style={{display:"flex",gap:6,alignItems:"center"}}>
                        <span style={{fontSize:10,color:th.textMuted}}>{genOutput.split(/\s+/).length+" words"}</span>
                        <button onClick={copyGen} style={{background:copied?curGenCat.color:th.surface,color:copied?"white":th.textSub,border:"1px solid "+(copied?curGenCat.color:th.border),borderRadius:6,padding:"4px 12px",fontSize:11,fontFamily:"'Syne',sans-serif",fontWeight:600,cursor:"pointer"}}>{copied?"Copied!":"Copy"}</button>
                      </div>
                    </div>
                    <div style={{padding:"14px",fontSize:12,color:th.text,lineHeight:1.75,whiteSpace:"pre-wrap",maxHeight:380,overflowY:"auto"}}>{genOutput}</div>
                    <div style={{padding:"9px 14px",borderTop:"1px solid "+curGenCat.color+"22",display:"flex",gap:8,alignItems:"center"}}>
                      <button onClick={runGen} style={{background:"none",border:"1px solid "+curGenCat.color+"44",borderRadius:6,color:curGenCat.color,fontSize:10,padding:"3px 10px",cursor:"pointer",fontFamily:"inherit"}}>Regenerate</button>
                      <span style={{fontSize:10,color:th.textMuted}}>Tweak fields above and regenerate if needed.</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* WELLBEING */}
        {appMode==="work"&&view==="wellbeing"&&(
          <div className="fu">
            <div style={{marginBottom:14}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:th.textSub,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:2}}>Wellbeing & Hours Tracker</div><div style={{fontSize:11,color:th.textMuted}}>UK Working Time Regulations max: 48 hrs. Log honestly.</div></div>
            {burnout&&<div style={{background:burnout.bg,border:"1px solid "+burnout.col+"44",borderRadius:10,padding:"12px 16px",marginBottom:14,display:"flex",gap:12,alignItems:"flex-start"}}><span style={{fontSize:22}}>{burnout.icon}</span><div><div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:burnout.col,fontSize:13,marginBottom:3}}>{burnout.level+" Risk"}</div><div style={{fontSize:12,color:th.textSub,lineHeight:1.5}}>{burnout.msg}</div></div></div>}
            <div style={card({marginBottom:12})}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:700,color:th.textMuted,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:10}}>This week - hours & mood</div>
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(function(day){var d=wb[day],h=parseFloat(d.hours)||0,isW=day==="Sat"||day==="Sun";return(
                <div key={day} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 10px",background:isW&&h>0?th.redBg:th.surface2,borderRadius:8,marginBottom:5,border:"1px solid "+(isW&&h>0?th.red+"44":th.border)}}>
                  <div style={{width:28,fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:700,color:isW?th.red:th.textSub,flexShrink:0}}>{day}</div>
                  <div style={{flex:1}}><div style={{height:4,background:th.border,borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",width:Math.min(100,(h/14)*100)+"%",background:h>10?th.red:h>8?th.amber:th.green,borderRadius:2}}/></div></div>
                  <input type="number" min="0" max="16" step="0.5" value={d.hours} placeholder="hrs" onChange={function(e){var v=e.target.value;setWb(function(w){var next=Object.assign({},w);next[day]=Object.assign({},w[day],{hours:v});return next;});}} style={{width:52,background:th.inp,border:"1px solid "+th.border,borderRadius:6,padding:"3px 6px",color:h>10?th.red:th.text,fontSize:12,fontFamily:"inherit",textAlign:"center"}}/>
                  <div style={{display:"flex",gap:3}}>{MOODS.map(function(m){return(<button key={m.val} className="mb" onClick={function(){var v=m.val;setWb(function(w){var next=Object.assign({},w);next[day]=Object.assign({},w[day],{mood:v});return next;});}} title={m.label} style={{fontSize:15,opacity:d.mood===m.val?1:0.2,transform:d.mood===m.val?"scale(1.25)":"scale(1)",transition:"all 0.15s"}}>{m.emoji}</button>);})}</div>
                </div>
              );})}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:12}}>
              {[{label:"Total hours",val:totalHrs.toFixed(1),sub:"this week",col:totalHrs>52?th.red:totalHrs>45?th.amber:th.green},{label:"Days logged",val:loggedDays,sub:"of 7",col:th.accent},{label:"Avg mood",val:avgMoodObj?avgMoodObj.emoji:"-",sub:avgMoodObj?avgMoodObj.label:"No data yet",col:"#8B5CF6"}].map(function(s,i){return React.createElement("div",{key:i,style:card({textAlign:"center"})},React.createElement("div",{style:{fontSize:9,color:th.textMuted,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:3}},s.label),React.createElement("div",{style:{fontSize:24,fontWeight:700,color:s.col,fontFamily:"'Syne',sans-serif",lineHeight:1.1}},s.val),React.createElement("div",{style:{fontSize:9,color:th.textMuted,marginTop:3}},s.sub));  })}
            </div>
            <div style={{background:th.accentSub,border:"1px solid "+th.accent+"33",borderRadius:10,padding:"12px 14px",marginBottom:12}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:700,color:th.accent,letterSpacing:"0.13em",textTransform:"uppercase",marginBottom:6}}>Protected time reminder</div><div style={{fontSize:12,color:th.textSub,lineHeight:1.65}}>{"Evenings and weekends are recovery time. Education Support helpline - free, confidential, 24/7: "}<span style={{color:th.accent,fontWeight:600}}>0800 562 561</span></div></div>
            <div style={card()}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:700,color:th.textSub,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:12}}>Friday Weekly Review</div>
              {[{key:"wins",label:"What did I complete or do well this week?",ph:"Celebrate the wins..."},{key:"missed",label:"What did not get done, and why?",ph:"Be honest but not harsh on yourself..."},{key:"next",label:"My single #1 priority for next week is...",ph:"One clear focus - commit to it"}].map(function(q){return(
                <div key={q.key} style={{marginBottom:12}}>
                  <label style={{fontSize:12,color:th.textSub,display:"block",marginBottom:5,lineHeight:1.4}}>{q.label}</label>
                  <textarea value={review[q.key]} onChange={function(e){var v=e.target.value;setReview(function(r){return Object.assign({},r,{[q.key]:v});});}} placeholder={q.ph} rows={2} style={inpSt({resize:"vertical",fontSize:12,lineHeight:1.55})}/>
                </div>
              );})}
              {review.next&&<div style={{background:th.accentSub,border:"1px solid "+th.accent+"33",borderRadius:8,padding:"10px 12px",marginTop:6}}><div style={{fontSize:10,color:th.accent,letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:3}}>Next week's focus</div><div style={{fontSize:13,color:th.text,fontFamily:"'Syne',sans-serif",fontWeight:700}}>{review.next}</div></div>}
            </div>
          </div>
        )}

        {/* AI */}
        {appMode==="work"&&view==="ai"&&(
          <div className="fu" style={{display:"flex",flexDirection:"column",height:"calc(100vh - 200px)",minHeight:420}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:8}}>
              <div><div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:th.textSub,letterSpacing:"0.1em",textTransform:"uppercase"}}>AI Assistant</div><div style={{fontSize:10,color:th.textMuted,marginTop:2}}>Freeform requests - use Automate for one-click documents</div></div>
              <label style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:th.textMuted,cursor:"pointer"}}><input type="checkbox" checked={aiCtx} onChange={function(e){setAiCtx(e.target.checked);}} style={{accentColor:th.accent}}/>Include task list</label>
            </div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
              {AI_QS.map(function(q,i){return(<button key={i} onClick={function(){sendAI(q.prompt);}} style={{background:th.surface2,border:"1px solid "+th.border,borderRadius:6,color:th.textSub,fontSize:10,padding:"5px 10px",cursor:"pointer",fontFamily:"'DM Mono',monospace"}}>{q.label}</button>);})}
            </div>
            <div style={{flex:1,background:th.surface,border:"1px solid "+th.border,borderRadius:10,padding:"14px",overflowY:"auto",marginBottom:10,boxShadow:"0 2px 8px "+th.shadow}}>
              {aiMsgs.map(function(msg,i){return(
                <div key={i} style={{marginBottom:14,display:"flex",gap:9,flexDirection:msg.role==="user"?"row-reverse":"row"}} className="fu">
                  <div style={{width:26,height:26,minWidth:26,borderRadius:"50%",background:msg.role==="user"?th.accentSub:th.surface2,border:"1px solid "+(msg.role==="user"?th.accent+"44":th.border),display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0,marginTop:1}}>{msg.role==="user"?"👤":"🤖"}</div>
                  <div style={{maxWidth:"80%",background:msg.role==="user"?th.accentSub:th.surface2,border:"1px solid "+(msg.role==="user"?th.accent+"33":th.border),borderRadius:msg.role==="user"?"10px 2px 10px 10px":"2px 10px 10px 10px",padding:"10px 13px"}}>
                    <div style={{fontSize:12,color:th.text,lineHeight:1.65,whiteSpace:"pre-wrap"}}>{msg.content}</div>
                  </div>
                </div>
              );})}
              {aiLoading&&(
                <div style={{display:"flex",gap:9,marginBottom:14}}>
                  <div style={{width:26,height:26,minWidth:26,borderRadius:"50%",background:th.surface2,border:"1px solid "+th.border,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>🤖</div>
                  <div style={{background:th.surface2,border:"1px solid "+th.border,borderRadius:"2px 10px 10px 10px",padding:"12px 14px",display:"flex",gap:5,alignItems:"center"}}>
                    {[0,1,2].map(function(j){return <div key={j} style={{width:7,height:7,borderRadius:"50%",background:th.accent,animation:"aiDot 1.2s ease-in-out "+(j*0.2)+"s infinite"}}/>;  })}
                  </div>
                </div>
              )}
              <div ref={chatRef}/>
            </div>
            <div style={{display:"flex",gap:8}}>
              <textarea value={aiInput} onChange={function(e){setAiInput(e.target.value);}} onKeyDown={function(e){if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendAI(aiInput);}}} placeholder="Type a request or tap the mic... Enter to send" rows={2} style={inpSt({resize:"none",flex:1})}/>
              {MicBtn(setAiInput,"ai-input")}
              <button onClick={function(){sendAI(aiInput);}} disabled={!aiInput.trim()||aiLoading} style={{background:aiInput.trim()&&!aiLoading?th.accent:th.surface2,color:aiInput.trim()&&!aiLoading?th.accentText:th.textMuted,border:"none",borderRadius:8,padding:"0 16px",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:12,cursor:aiInput.trim()&&!aiLoading?"pointer":"default",minWidth:55}}>{aiLoading?"...":"Send"}</button>
            </div>
          </div>
        )}

        {/* ADD TASK */}
        {appMode==="work"&&view==="add"&&(
          <div className="fu" style={{maxWidth:520}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:th.textSub,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:14}}>New Task</div>
            <div style={{marginBottom:12}}><label style={lblSt()}>Task title</label><div style={{display:"flex",gap:6}}><input type="text" placeholder="e.g. Mark Year 10 assessments" value={newTask.title} onChange={function(e){var v=e.target.value;setNewTask(function(n){return Object.assign({},n,{title:v});});}} style={inpSt({flex:1})}/>{MicBtn(function(fn){setNewTask(function(n){return Object.assign({},n,{title:typeof fn==="function"?fn(n.title):fn});});}, "task-title")}</div></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
              <div><label style={lblSt()}>Category</label><select value={newTask.category} onChange={function(e){var v=e.target.value;setNewTask(function(n){return Object.assign({},n,{category:v});});}} style={selSt()}>{Object.keys(CATS).map(function(k){return <option key={k} value={k}>{CATS[k].icon+" "+CATS[k].label}</option>;})}</select></div>
              <div><label style={lblSt()}>Priority</label><select value={newTask.priority} onChange={function(e){var v=e.target.value;setNewTask(function(n){return Object.assign({},n,{priority:v});});}} style={selSt()}>{Object.keys(PRIS).map(function(k){return <option key={k} value={k}>{PRIS[k].label}</option>;})}</select></div>
              <div><label style={lblSt()}>Due Date</label><input type="date" value={newTask.dueDate} onChange={function(e){var v=e.target.value;setNewTask(function(n){return Object.assign({},n,{dueDate:v});});}} style={inpSt({colorScheme:"light"})}/></div>
              <div><label style={lblSt()}>Est. time (mins)</label><input type="number" min="5" step="5" value={newTask.estimatedMins} onChange={function(e){var v=parseInt(e.target.value)||0;setNewTask(function(n){return Object.assign({},n,{estimatedMins:v});});}} style={inpSt()}/></div>
            </div>
            <div style={{marginBottom:12}}><label style={lblSt()}>Recurring</label><select value={newTask.recurring||""} onChange={function(e){var v=e.target.value||null;setNewTask(function(n){return Object.assign({},n,{recurring:v});});}} style={selSt()}><option value="">One-off task</option><option value="weekly">🔁 Weekly</option><option value="fortnightly">🔁 Fortnightly</option><option value="halfTermly">🔁 Half-termly</option></select></div>
            <div style={{marginBottom:14}}><label style={lblSt()}>Notes (optional)</label><textarea value={newTask.notes} onChange={function(e){var v=e.target.value;setNewTask(function(n){return Object.assign({},n,{notes:v});});}} placeholder="e.g. Set 2, check against markscheme" rows={2} style={inpSt({resize:"vertical"})}/></div>
            <button onClick={addTask} style={{background:newTask.title&&newTask.dueDate?th.accent:th.surface2,color:newTask.title&&newTask.dueDate?th.accentText:th.textMuted,border:"none",borderRadius:8,padding:"11px 26px",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:12,letterSpacing:"0.07em",cursor:newTask.title&&newTask.dueDate?"pointer":"default"}}>Add to Task List</button>
          </div>
        )}

        {/* EMAIL PROCESSOR */}
        {appMode==="work"&&view==="email"&&(
          <div className="fu">
            <div style={{marginBottom:16}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:th.textSub,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:2}}>Email Processor</div>
              <div style={{fontSize:11,color:th.textMuted}}>Paste any email, upload attachments, get a summary, tasks and a ready-to-send reply</div>
            </div>

            <div style={card({marginBottom:14})}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                <div><label style={lblSt()}>From (optional)</label><input type="text" value={emailSender} onChange={function(e){setEmailSender(e.target.value);}} placeholder="e.g. Mrs J. Smith, parent" style={inpSt({fontSize:12})}/></div>
                <div><label style={lblSt()}>Subject (optional)</label><input type="text" value={emailSubject} onChange={function(e){setEmailSubject(e.target.value);}} placeholder="e.g. Year 10 parents evening" style={inpSt({fontSize:12})}/></div>
              </div>
              <div style={{marginBottom:12}}>
                <label style={lblSt()}>Paste email text here</label>
                <textarea value={emailText} onChange={function(e){setEmailText(e.target.value);}} placeholder={"Copy the full email from Outlook and paste it here. You can include the whole thread."} rows={7} style={inpSt({resize:"vertical",fontSize:12,lineHeight:1.6})}/>
              </div>
              <div style={{marginBottom:14}}>
                <label style={lblSt()}>Attachments (optional)</label>
                <div onDragOver={function(e){e.preventDefault();setEmailDragging(true);}} onDragLeave={function(){setEmailDragging(false);}} onDrop={function(e){e.preventDefault();setEmailDragging(false);handleEmailFiles(e.dataTransfer.files);}} style={{border:"2px dashed "+(emailDragging?th.accent:th.border),borderRadius:10,padding:"18px",textAlign:"center",background:emailDragging?th.accentSub:th.surface2,transition:"all 0.15s",cursor:"pointer"}} onClick={function(){document.getElementById("emailFileInput").click();}}>
                  <input id="emailFileInput" type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.txt,.csv" onChange={function(e){handleEmailFiles(e.target.files);e.target.value="";}} style={{display:"none"}}/>
                  <div style={{fontSize:22,marginBottom:6}}>📎</div>
                  <div style={{fontSize:12,color:th.textSub,fontWeight:600,marginBottom:3}}>Drop files here or click to upload</div>
                  <div style={{fontSize:10,color:th.textMuted}}>PDF, Word, Excel, images, text files - max 10MB each, up to 5 files</div>
                </div>
                {emailFiles.length>0&&(
                  <div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:6}}>
                    {emailFiles.map(function(f,i){return(
                      <div key={i} style={{background:th.accentSub,border:"1px solid "+th.accent+"33",borderRadius:6,padding:"5px 10px",display:"flex",alignItems:"center",gap:7}}>
                        <span style={{fontSize:14}}>{fileIcon(f)}</span>
                        <div>
                          <div style={{fontSize:11,color:th.text,fontWeight:600,maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f.name}</div>
                          <div style={{fontSize:9,color:th.textMuted}}>{Math.round(f.size/1024)+"KB"}</div>
                        </div>
                        <button onClick={function(){removeEmailFile(i);}} style={{background:"none",border:"none",color:th.textMuted,cursor:"pointer",fontSize:13,padding:0,lineHeight:1,marginLeft:2}}>x</button>
                      </div>
                    );})}
                  </div>
                )}
              </div>
              <button onClick={processEmail} disabled={!emailText.trim()||emailProcessing} style={{background:!emailText.trim()||emailProcessing?th.surface2:th.accent,color:!emailText.trim()||emailProcessing?th.textMuted:th.accentText,border:"none",borderRadius:8,padding:"11px 28px",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:13,letterSpacing:"0.06em",cursor:!emailText.trim()||emailProcessing?"default":"pointer",display:"flex",alignItems:"center",gap:8,boxShadow:!emailText.trim()||emailProcessing?"none":"0 3px 10px "+th.shadow}}>
                {emailProcessing?(<span style={{display:"flex",alignItems:"center",gap:7}}>{[0,1,2].map(function(j){return React.createElement("div",{key:j,style:{width:6,height:6,borderRadius:"50%",background:th.textMuted,animation:"aiDot 1.2s ease-in-out "+(j*0.2)+"s infinite"}});})}<span>Processing...</span></span>):<span>Process Email</span>}
              </button>
            </div>

            {emailResult&&(
              <div className="fu">
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
                  {[
                    {label:"Urgency",val:(emailResult.urgency||"").charAt(0).toUpperCase()+(emailResult.urgency||"").slice(1),col:URGENCY_COLOR[emailResult.urgency]||th.textMuted},
                    {label:"Sender type",val:CAT_LABELS[emailResult.senderType]||emailResult.senderType||"-",col:CAT_COLOR[emailResult.senderType]||th.textMuted},
                    {label:"Reply needed",val:emailResult.needsReply?"Yes":"No",col:emailResult.needsReply?th.red:th.green},
                  ].map(function(s,i){return(React.createElement("div",{key:i,style:card({textAlign:"center",padding:"10px 8px"})},React.createElement("div",{style:{fontSize:9,color:th.textMuted,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:3}},s.label),React.createElement("div",{style:{fontSize:15,fontWeight:700,color:s.col,fontFamily:"'Syne',sans-serif",lineHeight:1.2}},s.val)));  })}
                </div>

                <div style={card({marginBottom:12,borderLeft:"3px solid "+th.accent})}>
                  <div style={{fontSize:10,fontWeight:700,color:th.accent,letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:6}}>Summary</div>
                  <div style={{fontSize:13,color:th.text,lineHeight:1.6}}>{emailResult.summary}</div>
                  {emailResult.keyPoints&&emailResult.keyPoints.length>0&&(
                    <div style={{marginTop:10}}>{emailResult.keyPoints.map(function(pt,i){return(<div key={i} style={{fontSize:12,color:th.textSub,padding:"3px 0",borderTop:i>0?"1px solid "+th.border:"none",paddingTop:i>0?6:0,marginTop:i>0?3:0}}>{"- "+pt}</div>);})}</div>
                  )}
                </div>

                {emailResult.attachmentInsights&&emailResult.attachmentInsights.length>0&&(
                  <div style={card({marginBottom:12,borderLeft:"3px solid #8B5CF6"})}>
                    <div style={{fontSize:10,fontWeight:700,color:"#8B5CF6",letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:6}}>From attachments</div>
                    {emailResult.attachmentInsights.map(function(ins,i){return(<div key={i} style={{fontSize:12,color:th.textSub,padding:"3px 0",borderTop:i>0?"1px solid "+th.border:"none",paddingTop:i>0?6:0,marginTop:i>0?3:0}}>{"📎 "+ins}</div>);})}
                  </div>
                )}

                {emailResult.actions&&emailResult.actions.length>0&&(
                  <div style={card({marginBottom:12})}>
                    <div style={{fontSize:10,fontWeight:700,color:th.textMuted,letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:10}}>
                      Action items
                      {emailResult.actions.filter(function(a){return a.dueDate;}).length>0&&(
                        <span style={{marginLeft:8,fontSize:9,background:th.greenBg,color:th.green,borderRadius:3,padding:"1px 6px",border:"1px solid "+th.green+"44"}}>{emailResult.actions.filter(function(a){return a.dueDate;}).length+" auto-added to tasks"}</span>
                      )}
                    </div>
                    {emailResult.actions.map(function(action,i){
                      var pCol=URGENCY_COLOR[action.priority]||th.textMuted;
                      var cCat=CATS[action.category]||CATS.admin;
                      return(
                        <div key={i} style={{background:th.surface2,border:"1px solid "+th.border,borderLeft:"3px solid "+cCat.color,borderRadius:8,padding:"10px 12px",marginBottom:7,display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,flexWrap:"wrap"}}>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontSize:12,fontWeight:700,color:th.text,fontFamily:"'Syne',sans-serif",marginBottom:4}}>{action.title}</div>
                            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                              <span style={badge(cCat.color+"18",cCat.color,cCat.color+"33")}>{cCat.icon+" "+cCat.label}</span>
                              <span style={badge(pCol+"18",pCol,pCol+"33")}>{action.priority}</span>
                              {action.dueDate&&<span style={{fontSize:10,color:th.textMuted}}>{"Due: "+action.dueDate}</span>}
                              {action.dueDate&&<span style={{fontSize:9,background:th.greenBg,color:th.green,borderRadius:3,padding:"1px 5px"}}>Added to tasks</span>}
                            </div>
                            {action.notes&&<div style={{fontSize:11,color:th.textMuted,marginTop:4,fontStyle:"italic"}}>{action.notes}</div>}
                          </div>
                          {!action.dueDate&&<button onClick={function(){emailResultToTask(action);}} style={{background:"none",border:"1px solid "+th.accent+"55",borderRadius:6,padding:"4px 10px",fontSize:10,color:th.accent,cursor:"pointer",fontFamily:"inherit",fontWeight:600,whiteSpace:"nowrap",flexShrink:0}}>+ Add task</button>}
                          <button onClick={function(){setAddToMtgPoint(action.point);setView("meetings");}} style={{background:"none",border:"1px solid #8B5CF655",borderRadius:6,padding:"4px 10px",fontSize:10,color:"#8B5CF6",cursor:"pointer",fontFamily:"inherit",fontWeight:600,whiteSpace:"nowrap",flexShrink:0}}>+ Add to agenda</button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {emailResult.needsReply&&emailResult.replyDraft&&(
                  <div style={card({marginBottom:12,overflow:"hidden",padding:0})}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:th.accentSub,borderBottom:"1px solid "+th.accent+"22"}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:7,height:7,borderRadius:"50%",background:th.accent}}/><span style={{fontSize:10,fontWeight:700,color:th.accent,letterSpacing:"0.09em",textTransform:"uppercase"}}>Draft reply - ready to paste into Outlook</span></div>
                      <button onClick={copyReply} style={{background:emailReplyCopied?th.accent:th.surface,color:emailReplyCopied?th.accentText:th.textSub,border:"1px solid "+(emailReplyCopied?th.accent:th.border),borderRadius:6,padding:"4px 14px",fontSize:11,fontFamily:"'Syne',sans-serif",fontWeight:700,cursor:"pointer"}}>{emailReplyCopied?"Copied!":"Copy"}</button>
                    </div>
                    <div style={{padding:"14px",fontSize:12,color:th.text,lineHeight:1.8,whiteSpace:"pre-wrap",maxHeight:380,overflowY:"auto"}}>{emailResult.replyDraft}</div>
                  </div>
                )}

                <button onClick={function(){setEmailResult(null);setEmailText("");setEmailSender("");setEmailSubject("");setEmailFiles([]);}} style={{background:"none",border:"1px solid "+th.border,borderRadius:8,padding:"9px 18px",fontSize:11,color:th.textSub,cursor:"pointer",fontFamily:"inherit"}}>Process another email</button>
              </div>
            )}

            {!emailResult&&!emailProcessing&&(
              <div style={{background:th.accentSub,border:"1px solid "+th.accent+"33",borderRadius:10,padding:"14px 16px",fontSize:11,color:th.textSub,lineHeight:1.7}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:700,color:th.accent,marginBottom:6}}>How to use this</div>
                <div>1. Open the email in Outlook, select all text (Ctrl+A, Ctrl+C) and paste it above</div>
                <div style={{marginTop:4}}>2. For attachments - right-click in Outlook, Save As, then drag and drop or click to upload here. Supports PDFs, Word docs, Excel files and images</div>
                <div style={{marginTop:4}}>3. Hit Process Email - I will summarise it, extract tasks with deadlines (auto-added to your task list), and draft a professional reply ready to copy back into Outlook</div>
              </div>
            )}
          </div>
        )}


        {/* ═══════════════ HOME DASHBOARD ═══════════════ */}
        {appMode==="home"&&view==="h-dash"&&(
          <div className="fu">
            <div style={{marginBottom:18}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:800,color:th.text,letterSpacing:"-0.02em",marginBottom:4}}>{"Good evening, "+(settings.name||"Tom")+" 🏡"}</div>
              <div style={{fontSize:11,color:th.textMuted}}>{"Sunday, 24 May 2026"}</div>
            </div>

            {/* Family quick edit */}
            <div style={card({marginBottom:14})}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:700,color:th.textMuted,letterSpacing:"0.1em",textTransform:"uppercase"}}>Your family</div>
                <button onClick={function(){setShowFamEdit(function(s){return !s;});}} style={{background:"none",border:"1px solid "+th.border,borderRadius:5,padding:"3px 10px",fontSize:10,color:th.textMuted,cursor:"pointer",fontFamily:"inherit"}}>{showFamEdit?"Done":"Edit names"}</button>
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {family.map(function(m){return(
                  <div key={m.id} style={{background:m.color+"18",border:"1px solid "+m.color+"44",borderRadius:10,padding:"10px 14px",textAlign:"center",minWidth:80,flex:1}}>
                    <div style={{width:36,height:36,borderRadius:"50%",background:m.color,margin:"0 auto 6px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"white",fontFamily:"'Syne',sans-serif",fontWeight:700}}>{(m.name||m.role).charAt(0).toUpperCase()}</div>
                    {showFamEdit?(
                      <input type="text" value={m.name} onChange={function(e){updateFamilyName(m.id,e.target.value);}} placeholder={m.role} style={{width:"100%",background:"none",border:"none",borderBottom:"1px solid "+m.color,textAlign:"center",fontSize:11,color:m.color,fontFamily:"inherit",padding:"2px",outline:"none"}}/>
                    ):(
                      <div style={{fontSize:11,fontWeight:700,color:m.color,fontFamily:"'Syne',sans-serif"}}>{m.name||m.role}</div>
                    )}
                    <div style={{fontSize:9,color:th.textMuted,marginTop:1}}>{m.role}</div>
                  </div>
                );})}
              </div>
            </div>

            {/* Today summary */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              <div style={card({borderLeft:"3px solid "+th.accent})}>
                <div style={{fontSize:9,fontWeight:700,color:th.accent,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>Tonight's dinner</div>
                {tonightsMeal?(
                  <div style={{fontSize:14,fontWeight:700,color:th.text,fontFamily:"'Syne',sans-serif"}}>{tonightsMeal}</div>
                ):(
                  <div style={{fontSize:12,color:th.textMuted}}>Not planned yet</div>
                )}
                <button onClick={function(){setView("h-meals");setMealTab("plan");}} style={{marginTop:6,background:"none",border:"none",color:th.accent,fontSize:10,cursor:"pointer",padding:0,fontFamily:"inherit",fontWeight:600}}>{"View meal plan >"}</button>
              </div>
              <div style={card({borderLeft:"3px solid "+(monthlyLeft>=0?th.green:th.red)})}>
                <div style={{fontSize:9,fontWeight:700,color:th.textMuted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>Budget this week</div>
                {finances.monthlyIncome>0?(
                  <div style={{fontSize:14,fontWeight:700,color:weeklyLeft>=0?th.green:th.red,fontFamily:"'Syne',sans-serif"}}>{weeklyLeft>=0?"~£"+Math.round(weeklyLeft)+" left":"Over by £"+Math.abs(Math.round(weeklyLeft))}</div>
                ):(
                  <div style={{fontSize:12,color:th.textMuted}}>Set income in Finance</div>
                )}
                <button onClick={function(){setView("h-finance");}} style={{marginTop:6,background:"none",border:"none",color:th.accent,fontSize:10,cursor:"pointer",padding:0,fontFamily:"inherit",fontWeight:600}}>{"View budget >"}</button>
              </div>
            </div>

            {/* Today's clubs */}
            <div style={card({marginBottom:14})}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:700,color:th.textMuted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10}}>{"Today's activities ("+todayDay+")"}</div>
              {todayClubs.length===0?(
                <div style={{fontSize:12,color:th.textMuted}}>No activities today - enjoy the evening!</div>
              ):(
                todayClubs.map(function(c){
                  var mem=family.find(function(f){return f.id===c.memberId;})||{name:c.memberId,color:th.accent};
                  return(
                    <div key={c.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderTop:"1px solid "+th.border}}>
                      <div style={{width:28,height:28,borderRadius:"50%",background:mem.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"white",fontWeight:700,flexShrink:0}}>{(mem.name||mem.role||"?").charAt(0)}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:12,fontWeight:700,color:th.text,fontFamily:"'Syne',sans-serif"}}>{c.name}</div>
                        <div style={{fontSize:10,color:th.textMuted}}>{c.time+(c.location?" · "+c.location:"")}</div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Quick links */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
              {[
                {label:"All clubs",icon:"🏃",sub:clubs.length+" active",view:"h-clubs"},
                {label:"Shopping",icon:"🛒",sub:shoppingList.filter(function(i){return !i.done;}).length+" items",view:"h-meals"},
                {label:"Finances",icon:"💰",sub:finances.monthlyIncome>0?"Set up":"Add income",view:"h-finance"},
              ].map(function(q,i){return(
                <button key={i} onClick={function(){setView(q.view);}} style={{background:th.surface,border:"1px solid "+th.border,borderRadius:10,padding:"12px 10px",cursor:"pointer",textAlign:"center",boxShadow:"0 2px 6px "+th.shadow}}>
                  <div style={{fontSize:22,marginBottom:4}}>{q.icon}</div>
                  <div style={{fontSize:11,fontWeight:700,color:th.text,fontFamily:"'Syne',sans-serif"}}>{q.label}</div>
                  <div style={{fontSize:10,color:th.textMuted,marginTop:2}}>{q.sub}</div>
                </button>
              );})}
            </div>
          </div>
        )}

        {/* ═══════════════ HOME CLUBS ═══════════════ */}
        {appMode==="home"&&view==="h-clubs"&&(
          <div className="fu">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16,flexWrap:"wrap",gap:10}}>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:th.textSub,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:2}}>Family Clubs & Activities</div>
                <div style={{fontSize:11,color:th.textMuted}}>{"Total cost: £"+totalClubCosts+"/month · "+clubs.length+" activities"}</div>
              </div>
              <button onClick={function(){setShowAddClub(function(s){return !s;});}} style={{background:showAddClub?th.accent:th.accentSub,color:showAddClub?th.accentText:th.accent,border:"1px solid "+th.accent+"55",borderRadius:8,padding:"7px 14px",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:11,cursor:"pointer"}}>{showAddClub?"Cancel":"+ Add activity"}</button>
            </div>

            {showAddClub&&(
              <div style={card({marginBottom:16})} className="fu">
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:700,color:th.textSub,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:12}}>New activity</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
                  <div style={{gridColumn:"span 2"}}><label style={lblSt()}>Activity name</label><input type="text" value={newClub.name} onChange={function(e){var v=e.target.value;setNewClub(function(c){return Object.assign({},c,{name:v});});}} placeholder="e.g. Football, Ballet, Scouts" style={inpSt()}/></div>
                  <div><label style={lblSt()}>Family member</label><select value={newClub.memberId} onChange={function(e){var v=e.target.value;setNewClub(function(c){return Object.assign({},c,{memberId:v});});}} style={selSt()}>
                    {family.map(function(m){return <option key={m.id} value={m.id}>{m.name||m.role}</option>;})}
                  </select></div>
                  <div><label style={lblSt()}>Day</label><select value={newClub.day} onChange={function(e){var v=e.target.value;setNewClub(function(c){return Object.assign({},c,{day:v});});}} style={selSt()}>
                    {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(function(d){return <option key={d} value={d}>{d}</option>;})}
                  </select></div>
                  <div><label style={lblSt()}>Time</label><input type="time" value={newClub.time} onChange={function(e){var v=e.target.value;setNewClub(function(c){return Object.assign({},c,{time:v});});}} style={inpSt({colorScheme:"light"})}/></div>
                  <div><label style={lblSt()}>Monthly cost (£)</label><input type="number" min="0" value={newClub.costPerMonth} onChange={function(e){var v=parseFloat(e.target.value)||0;setNewClub(function(c){return Object.assign({},c,{costPerMonth:v});});}} style={inpSt()}/></div>
                  <div style={{gridColumn:"span 2"}}><label style={lblSt()}>Location</label><input type="text" value={newClub.location} onChange={function(e){var v=e.target.value;setNewClub(function(c){return Object.assign({},c,{location:v});});}} placeholder="e.g. Sports centre, school" style={inpSt()}/></div>
                </div>
                <button onClick={addClub} disabled={!newClub.name.trim()} style={{background:newClub.name.trim()?th.accent:th.surface2,color:newClub.name.trim()?th.accentText:th.textMuted,border:"none",borderRadius:8,padding:"9px 22px",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:12,cursor:newClub.name.trim()?"pointer":"default"}}>Add activity</button>
              </div>
            )}


            {/* Edit club modal */}
            {editClub&&(
              <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
                <div style={{background:th.surface,border:"1px solid "+th.border,borderRadius:14,padding:20,width:"100%",maxWidth:460,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800,color:th.text,marginBottom:14}}>Edit activity</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
                    <div style={{gridColumn:"span 2"}}><label style={lblSt()}>Activity name</label><input type="text" value={editClub.name} onChange={function(e){var v=e.target.value;setEditClub(function(c){return Object.assign({},c,{name:v});});}} style={inpSt()}/></div>
                    <div><label style={lblSt()}>Family member</label><select value={editClub.memberId} onChange={function(e){var v=e.target.value;setEditClub(function(c){return Object.assign({},c,{memberId:v});});}} style={selSt()}>
                      {family.map(function(m){return <option key={m.id} value={m.id}>{m.name||m.role}</option>;})}
                    </select></div>
                    <div><label style={lblSt()}>Day</label><select value={editClub.day} onChange={function(e){var v=e.target.value;setEditClub(function(c){return Object.assign({},c,{day:v});});}} style={selSt()}>
                      {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(function(d){return <option key={d} value={d}>{d}</option>;})}
                    </select></div>
                    <div><label style={lblSt()}>Time</label><input type="time" value={editClub.time} onChange={function(e){var v=e.target.value;setEditClub(function(c){return Object.assign({},c,{time:v});});}} style={inpSt({colorScheme:"light"})}/></div>
                    <div><label style={lblSt()}>Monthly cost (£)</label><input type="number" min="0" value={editClub.costPerMonth} onChange={function(e){var v=parseFloat(e.target.value)||0;setEditClub(function(c){return Object.assign({},c,{costPerMonth:v});});}} style={inpSt()}/></div>
                    <div style={{gridColumn:"span 2"}}><label style={lblSt()}>Frequency</label>
                      <div style={{display:"flex",gap:6}}>
                        {["weekly","fortnightly"].map(function(f){
                          return <button key={f} onClick={function(){setEditClub(function(c){return Object.assign({},c,{frequency:f});});}} style={{flex:1,background:editClub.frequency===f?th.accent:th.surface2,color:editClub.frequency===f?th.accentText:th.textSub,border:"1.5px solid "+(editClub.frequency===f?th.accent:th.border),borderRadius:7,padding:"7px 0",fontFamily:"inherit",fontSize:12,cursor:"pointer",fontWeight:editClub.frequency===f?700:400}}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>;
                        })}
                      </div>
                    </div>
                    {editClub.frequency==="fortnightly"&&(
                      <div style={{gridColumn:"span 2"}}><label style={lblSt()}>Starts on</label>
                        <div style={{display:"flex",gap:6}}>
                          {[{v:0,l:"This week (Week A pattern)"},{v:1,l:"Next week (Week B pattern)"}].map(function(o){
                            return <button key={o.v} onClick={function(){setEditClub(function(c){return Object.assign({},c,{fortnightOffset:o.v});});}} style={{flex:1,background:editClub.fortnightOffset===o.v?th.accentSub:th.surface2,color:editClub.fortnightOffset===o.v?th.accent:th.textSub,border:"1.5px solid "+(editClub.fortnightOffset===o.v?th.accent:th.border),borderRadius:7,padding:"7px 6px",fontFamily:"inherit",fontSize:11,cursor:"pointer"}}>{o.l}</button>;
                          })}
                        </div>
                      </div>
                    )}
                    <div style={{gridColumn:"span 2"}}><label style={lblSt()}>Location</label><input type="text" value={editClub.location} onChange={function(e){var v=e.target.value;setEditClub(function(c){return Object.assign({},c,{location:v});});}} style={inpSt()}/></div>
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={function(){updateClub(editClub);}} disabled={!editClub.name.trim()} style={{background:editClub.name.trim()?th.accent:th.surface2,color:editClub.name.trim()?th.accentText:th.textMuted,border:"none",borderRadius:8,padding:"10px 0",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:12,cursor:editClub.name.trim()?"pointer":"default",flex:1}}>Save changes</button>
                    <button onClick={function(){setEditClub(null);}} style={{background:th.surface2,border:"1px solid "+th.border,borderRadius:8,padding:"10px 14px",color:th.textSub,cursor:"pointer",fontFamily:"inherit",fontSize:12}}>Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {/* Member filter */}
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
              <button className="nb" onClick={function(){setClubFilter("all");}} style={{background:clubFilter==="all"?th.accent:th.surface2,color:clubFilter==="all"?th.accentText:th.textSub,border:"1px solid "+(clubFilter==="all"?th.accent:th.border),borderRadius:6,padding:"5px 12px",fontSize:10,fontFamily:"inherit",fontWeight:clubFilter==="all"?700:400}}>All family</button>
              {family.map(function(m){return(
                <button key={m.id} className="nb" onClick={function(){setClubFilter(m.id);}} style={{background:clubFilter===m.id?m.color+"18":th.surface2,color:clubFilter===m.id?m.color:th.textSub,border:"1px solid "+(clubFilter===m.id?m.color+"55":th.border),borderRadius:6,padding:"5px 12px",fontSize:10,fontFamily:"inherit",fontWeight:clubFilter===m.id?700:400}}>{m.name||m.role}</button>
              );})}
            </div>

            {/* Weekly grid */}
            <div style={card({marginBottom:14})}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:700,color:th.textMuted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:12}}>Week at a glance</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
                {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(function(day){
                  var dayClubs=clubs.filter(function(c){return c.day===day&&(clubFilter==="all"||c.memberId===clubFilter);});
                  return(
                    <div key={day} style={{textAlign:"center"}}>
                      <div style={{fontSize:9,fontWeight:700,color:day===todayDay?th.accent:th.textMuted,marginBottom:4,letterSpacing:"0.04em"}}>{day}</div>
                      {dayClubs.length===0&&<div style={{height:24,background:th.surface2,borderRadius:4}}/>}
                      {dayClubs.map(function(c){
                        var mem=family.find(function(f){return f.id===c.memberId;})||{color:th.accent};
                        return <div key={c.id} style={{background:mem.color+"22",border:"1px solid "+mem.color+"44",borderRadius:4,padding:"2px 3px",marginBottom:2,fontSize:8,color:mem.color,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}} title={c.name}>{c.name}</div>;
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Club cards */}
            {(clubFilter==="all"?clubs:clubs.filter(function(c){return c.memberId===clubFilter;})).map(function(c){
              var mem=family.find(function(f){return f.id===c.memberId;})||{name:c.memberId,color:th.accent,role:""};
              return(
                <div key={c.id} style={card({marginBottom:8,borderLeft:"3px solid "+mem.color})}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:th.text,marginBottom:5}}>{c.name}</div>
                      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                        <span style={{fontSize:10,background:mem.color+"18",color:mem.color,border:"1px solid "+mem.color+"33",borderRadius:4,padding:"1px 7px",fontWeight:600}}>{mem.name||mem.role}</span>
                        <span style={{fontSize:10,color:th.textMuted}}>{"📅 "+c.day+" "+c.time}</span>
                        {c.location&&<span style={{fontSize:10,color:th.textMuted}}>{"📍 "+c.location}</span>}
                        {c.costPerMonth>0&&<span style={{fontSize:10,color:th.amber}}>{"£"+c.costPerMonth+"/mo"}</span>}
                        {c.frequency==="fortnightly"&&<span style={{fontSize:9,color:th.accent,background:th.accentSub,borderRadius:3,padding:"1px 5px"}}>fortnightly</span>}
                      </div>
                    </div>
                    <div style={{display:"flex",gap:5,flexShrink:0}}>
                      <button onClick={function(){setEditClub(Object.assign({},c,{frequency:c.frequency||"weekly",fortnightOffset:c.fortnightOffset||0,exceptions:c.exceptions||[]}));}} style={{background:"none",border:"1px solid "+th.accent+"44",borderRadius:5,padding:"3px 8px",fontSize:10,color:th.accent,cursor:"pointer",fontFamily:"inherit"}}>✏ Edit</button>
                      <button onClick={function(){removeClub(c.id);}} style={{background:"none",border:"1px solid "+th.red+"44",borderRadius:5,padding:"3px 8px",fontSize:10,color:th.red,cursor:"pointer",fontFamily:"inherit"}}>Remove</button>
                    </div>
                  </div>
                </div>
              );
            })}

            {clubs.length===0&&<div style={card({textAlign:"center",padding:"40px",color:th.textMuted})}>No activities yet. Add one above.</div>}
          </div>
        )}

        {/* ═══════════════ HOME FINANCE ═══════════════ */}
        {appMode==="home"&&view==="h-finance"&&(
          <div className="fu">
            <div style={{marginBottom:16}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:th.textSub,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:2}}>Family Finance</div>
              <div style={{fontSize:11,color:th.textMuted}}>Enter your figures to see what you genuinely have left each week</div>
            </div>

            {/* Income + summary */}
            <div style={card({marginBottom:12,borderLeft:"3px solid "+th.green})}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:8}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:700,color:th.textMuted,letterSpacing:"0.1em",textTransform:"uppercase"}}>Monthly take-home income</div>
                <button onClick={function(){setFinPrivate(function(s){return !s;});}} style={{background:"none",border:"1px solid "+th.border,borderRadius:5,padding:"3px 8px",fontSize:10,color:th.textMuted,cursor:"pointer",fontFamily:"inherit"}}>{finPrivate?"Show":"Hide"}</button>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                <span style={{fontSize:18,color:th.textMuted}}>£</span>
                <input type="number" min="0" value={finances.monthlyIncome||""} onChange={function(e){updateFinIncome(e.target.value);}} placeholder="e.g. 4200" style={inpSt({flex:1,fontSize:16,fontWeight:700})}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                {[
                  {label:"Monthly out",val:"£"+(finPrivate?"••••":Math.round(totalMonthlyOut)),col:th.red},
                  {label:"Monthly left",val:finances.monthlyIncome>0?"£"+(finPrivate?"••••":Math.round(monthlyLeft)):"-",col:monthlyLeft>=0?th.green:th.red},
                  {label:"Weekly left",val:finances.monthlyIncome>0?"£"+(finPrivate?"••••":Math.round(weeklyLeft)):"-",col:weeklyLeft>=0?th.green:th.red},
                ].map(function(s,i){return(
                  <div key={i} style={{background:th.surface2,border:"1px solid "+th.border,borderRadius:8,padding:"10px 8px",textAlign:"center"}}>
                    <div style={{fontSize:9,color:th.textMuted,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:3}}>{s.label}</div>
                    <div style={{fontSize:18,fontWeight:700,color:s.col,fontFamily:"'Syne',sans-serif"}}>{s.val}</div>
                  </div>
                );})}
              </div>
            </div>

            {/* Outgoings */}
            <div style={card({marginBottom:12})}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:700,color:th.textMuted,letterSpacing:"0.1em",textTransform:"uppercase"}}>Monthly outgoings</div>
                <button onClick={function(){setShowAddFin(function(s){return !s;});}} style={{background:"none",border:"1px solid "+th.accent+"55",borderRadius:5,padding:"3px 10px",fontSize:10,color:th.accent,cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>{showAddFin?"Cancel":"+ Add"}</button>
              </div>
              {showAddFin&&(
                <div style={{background:th.surface2,border:"1px solid "+th.border,borderRadius:8,padding:"12px",marginBottom:12}} className="fu">
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                    <div style={{gridColumn:"span 2"}}><label style={lblSt()}>Name</label><input type="text" value={newFin.name} onChange={function(e){var v=e.target.value;setNewFin(function(n){return Object.assign({},n,{name:v});});}} placeholder="e.g. Gym membership" style={inpSt({fontSize:12})}/></div>
                    <div><label style={lblSt()}>Amount (£)</label><input type="number" min="0" value={newFin.amount||""} onChange={function(e){var v=parseFloat(e.target.value)||0;setNewFin(function(n){return Object.assign({},n,{amount:v});});}} style={inpSt({fontSize:12})}/></div>
                    <div><label style={lblSt()}>Category</label><select value={newFin.category} onChange={function(e){var v=e.target.value;setNewFin(function(n){return Object.assign({},n,{category:v});});}} style={selSt({fontSize:12})}>
                      {Object.keys(FIN_CATS).map(function(k){return <option key={k} value={k}>{FIN_CATS[k]}</option>;})}
                    </select></div>
                  </div>
                  <button onClick={addFinItem} disabled={!newFin.name.trim()} style={{background:newFin.name.trim()?th.accent:th.surface2,color:newFin.name.trim()?th.accentText:th.textMuted,border:"none",borderRadius:6,padding:"7px 16px",fontSize:11,cursor:newFin.name.trim()?"pointer":"default",fontFamily:"'Syne',sans-serif",fontWeight:700}}>Add</button>
                </div>
              )}
              {Object.keys(FIN_CATS).map(function(cat){
                var items=finances.items.filter(function(i){return i.category===cat;});
                if(items.length===0)return null;
                var catTotal=items.reduce(function(s,i){return s+(i.frequency==="weekly"?i.amount*4:i.amount);},0);
                return(
                  <div key={cat} style={{marginBottom:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                      <div style={{fontSize:10,fontWeight:700,color:th.textSub,letterSpacing:"0.06em"}}>{FIN_CATS[cat]}</div>
                      <div style={{fontSize:10,color:th.textMuted}}>{"£"+(finPrivate?"••":Math.round(catTotal))+"/mo"}</div>
                    </div>
                    {items.map(function(item){return(
                      <div key={item.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",background:th.surface2,borderRadius:7,marginBottom:4}}>
                        <div style={{flex:1,fontSize:11,color:th.text}}>{item.name}</div>
                        <div style={{display:"flex",alignItems:"center",gap:6}}>
                          <span style={{fontSize:9,color:th.textMuted}}>{item.frequency}</span>
                          <div style={{display:"flex",alignItems:"center",gap:3}}>
                            <span style={{fontSize:11,color:th.textMuted}}>£</span>
                            <input type="number" min="0" value={item.amount||""} onChange={function(e){updateFinItem(item.id,"amount",e.target.value);}} style={{width:60,background:th.inp,border:"1px solid "+th.border,borderRadius:5,padding:"2px 5px",fontSize:11,textAlign:"right",color:th.text,fontFamily:"inherit"}}/>
                          </div>
                          <button onClick={function(){removeFinItem(item.id);}} style={{background:"none",border:"none",color:th.textMuted,cursor:"pointer",fontSize:11,padding:0,lineHeight:1}}>x</button>
                        </div>
                      </div>
                    );})}
                  </div>
                );
              })}
            </div>

            {/* Savings goals */}
            <div style={card()}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:700,color:th.textMuted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:12}}>Savings goals</div>
              {finances.savingsGoals.map(function(g){
                var pct=g.target>0?Math.min(100,Math.round((g.current/g.target)*100)):0;
                return(
                  <div key={g.id} style={{marginBottom:14}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                      <div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:th.text}}>{g.name}</div>
                      <div style={{fontSize:11,color:th.textMuted}}>{"£"+(finPrivate?"••":""+g.current)+" / £"+(finPrivate?"••":""+g.target)+" ("+pct+"%)"}</div>
                    </div>
                    <div style={{height:8,background:th.border,borderRadius:4,overflow:"hidden",marginBottom:6}}>
                      <div style={{height:"100%",width:pct+"%",background:g.color,borderRadius:4,transition:"width 0.3s"}}/>
                    </div>
                    <div style={{display:"flex",gap:6,alignItems:"center"}}>
                      <span style={{fontSize:10,color:th.textMuted}}>Saved:</span>
                      <div style={{display:"flex",alignItems:"center",gap:3}}>
                        <span style={{fontSize:10,color:th.textMuted}}>£</span>
                        <input type="number" min="0" value={g.current||""} onChange={function(e){updateSavGoal(g.id,"current",e.target.value);}} style={{width:65,background:th.inp,border:"1px solid "+th.border,borderRadius:5,padding:"2px 5px",fontSize:11,color:g.color,fontFamily:"inherit"}}/>
                      </div>
                      <span style={{fontSize:10,color:th.textMuted}}>Target: £</span>
                      <input type="number" min="0" value={g.target||""} onChange={function(e){updateSavGoal(g.id,"target",e.target.value);}} style={{width:65,background:th.inp,border:"1px solid "+th.border,borderRadius:5,padding:"2px 5px",fontSize:11,color:th.textMuted,fontFamily:"inherit"}}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══════════════ HOME MEALS & SHOPPING ═══════════════ */}
        {appMode==="home"&&view==="h-meals"&&(
          <div className="fu">
            <div style={{marginBottom:14}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:th.textSub,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:2}}>Meals & Shopping</div>
              <div style={{fontSize:11,color:th.textMuted}}>Plan the week, generate a shopping list, track what you need</div>
            </div>
            {/* Internal tabs */}
            <div style={{display:"flex",gap:5,marginBottom:16}}>
              {[{id:"plan",label:"🍽 Meal Plan"},{id:"shop",label:"🛒 Shopping List"}].map(function(t){return(
                <button key={t.id} className="nb" onClick={function(){setMealTab(t.id);}} style={{background:mealTab===t.id?th.accent:th.surface2,color:mealTab===t.id?th.accentText:th.textSub,border:"1px solid "+(mealTab===t.id?th.accent:th.border),borderRadius:8,padding:"7px 16px",fontSize:11,fontFamily:"'DM Mono',monospace",fontWeight:mealTab===t.id?600:400}}>{t.label}</button>
              );})}
            </div>

            {mealTab==="plan"&&(
              <div>
                {/* AI suggest button */}
                <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
                  <button onClick={suggestMeals} disabled={mealLoading} style={{background:mealLoading?th.surface2:th.accent,color:mealLoading?th.textMuted:th.accentText,border:"none",borderRadius:8,padding:"9px 18px",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:12,cursor:mealLoading?"wait":"pointer",flex:1}}>
                    {mealLoading?"Thinking...":"Suggest this week's meals"}
                  </button>
                  <button onClick={buildShoppingFromMeals} disabled={mealLoading||Object.values(mealPlan).filter(Boolean).length===0} style={{background:th.greenBg,color:th.green,border:"1px solid "+th.green+"44",borderRadius:8,padding:"9px 14px",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:11,cursor:"pointer",whiteSpace:"nowrap"}}>
                    Build shopping list
                  </button>
                </div>

                {/* AI suggestions */}
                {mealSugg&&(
                  <div style={card({marginBottom:14,borderLeft:"3px solid "+th.accent})} className="fu">
                    <div style={{fontSize:10,fontWeight:700,color:th.accent,letterSpacing:"0.09em",textTransform:"uppercase",marginBottom:8}}>AI suggestions - tap a meal to add it</div>
                    <div style={{fontSize:12,color:th.text,lineHeight:1.8,whiteSpace:"pre-wrap"}}>{mealSugg}</div>
                  </div>
                )}

                {/* 7-day grid */}
                <div style={card({marginBottom:14})}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:700,color:th.textMuted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:12}}>This week</div>
                  {MEAL_DAYS.map(function(day){return(
                    <div key={day} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderTop:"1px solid "+th.border}}>
                      <div style={{width:32,fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:700,color:day===todayDay?th.accent:th.textSub,flexShrink:0}}>{day}</div>
                      <input type="text" value={mealPlan[day]||""} onChange={function(e){var v=e.target.value;setMealDay(day,v);}} placeholder="What are we having?" style={{flex:1,background:"none",border:"none",borderBottom:"1px solid "+th.border,padding:"4px 0",fontSize:12,color:th.text,fontFamily:"inherit",outline:"none"}}/>
                      {mealPlan[day]&&<button onClick={function(){addToFavs(mealPlan[day]);}} title="Save to favourites" style={{background:"none",border:"none",cursor:"pointer",fontSize:14,padding:0,opacity:0.5}}>★</button>}
                    </div>
                  );})}
                </div>

                {/* Favourites */}
                <div style={card()}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:700,color:th.textMuted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>Family favourites</div>
                  <div style={{display:"flex",gap:6,marginBottom:8}}>
                    <input type="text" value={newFav} onChange={function(e){setNewFav(e.target.value);}} onKeyDown={function(e){if(e.key==="Enter"&&newFav.trim()){setMealFavs(function(p){return p.indexOf(newFav.trim())<0?p.concat([newFav.trim()]):p;});setNewFav("");}}} placeholder="Type a meal and press Enter..." style={inpSt({flex:1,fontSize:12})}/>
                    <button onClick={function(){if(newFav.trim()){setMealFavs(function(p){return p.indexOf(newFav.trim())<0?p.concat([newFav.trim()]):p;});setNewFav("");}}} style={{background:th.accent,color:th.accentText,border:"none",borderRadius:7,padding:"0 14px",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:12,cursor:"pointer"}}>Add</button>
                  </div>
                  <div style={{fontSize:11,color:th.textMuted,marginBottom:6}}>Tap a favourite to add it to a day</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {mealFavs.map(function(meal){return(
                      <div key={meal} style={{background:th.accentSub,border:"1px solid "+th.accent+"33",borderRadius:16,padding:"4px 12px",display:"flex",alignItems:"center",gap:6}}>
                        <span style={{fontSize:11,color:th.accentSubTxt}}>{meal}</span>
                        <button onClick={function(){removeFav(meal);}} style={{background:"none",border:"none",color:th.textMuted,cursor:"pointer",fontSize:11,padding:0,lineHeight:1}}>x</button>
                      </div>
                    );})}
                  </div>
                </div>
              </div>
            )}

            {mealTab==="shop"&&(
              <div>
                {/* Add item */}
                <div style={card({marginBottom:12})}>
                  <div style={{display:"flex",gap:8,marginBottom:8,flexWrap:"wrap"}}>
                    <input type="text" value={newShopItem} onChange={function(e){setNewShopItem(e.target.value);}} onKeyDown={function(e){if(e.key==="Enter")addShopItem();}} placeholder="Add item... press Enter" style={inpSt({flex:1,minWidth:150,fontSize:12})}/>
                    <select value={newShopCat} onChange={function(e){setNewShopCat(e.target.value);}} style={selSt({width:"auto",minWidth:100,fontSize:11})}>
                      {SHOP_CATS.map(function(c){return <option key={c} value={c}>{c}</option>;})}
                    </select>
                    <button onClick={addShopItem} disabled={!newShopItem.trim()} style={{background:newShopItem.trim()?th.accent:th.surface2,color:newShopItem.trim()?th.accentText:th.textMuted,border:"none",borderRadius:8,padding:"0 16px",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:12,cursor:newShopItem.trim()?"pointer":"default",whiteSpace:"nowrap"}}>Add</button>
                  </div>
                  <div style={{display:"flex",gap:6,justifyContent:"space-between",alignItems:"center",flexWrap:"wrap"}}>
                    <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                      <button className="nb" onClick={function(){setShopFilter("all");}} style={{background:shopFilter==="all"?th.accent:th.surface2,color:shopFilter==="all"?th.accentText:th.textSub,border:"1px solid "+(shopFilter==="all"?th.accent:th.border),borderRadius:6,padding:"3px 10px",fontSize:10,fontFamily:"inherit"}}>All</button>
                      {SHOP_CATS.filter(function(c){return shoppingList.some(function(i){return i.category===c&&!i.done;});}).map(function(c){return(
                        <button key={c} className="nb" onClick={function(){setShopFilter(c);}} style={{background:shopFilter===c?th.accent:th.surface2,color:shopFilter===c?th.accentText:th.textSub,border:"1px solid "+(shopFilter===c?th.accent:th.border),borderRadius:6,padding:"3px 10px",fontSize:10,fontFamily:"inherit"}}>{c}</button>
                      );})}
                    </div>
                    {shoppingList.filter(function(i){return i.done;}).length>0&&(
                      <button onClick={clearDoneShop} style={{background:"none",border:"1px solid "+th.border,borderRadius:5,padding:"3px 10px",fontSize:10,color:th.textMuted,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>Clear done</button>
                    )}
                  </div>
                </div>

                {/* Shopping items grouped by category */}
                {shoppingList.length===0&&<div style={card({textAlign:"center",padding:"40px",color:th.textMuted})}>List is empty. Add items above or build from your meal plan.</div>}
                {SHOP_CATS.filter(function(c){return shoppingList.some(function(i){return i.category===c&&(shopFilter==="all"||shopFilter===c);});}).map(function(cat){
                  var items=shoppingList.filter(function(i){return i.category===cat&&(shopFilter==="all"||shopFilter===cat);});
                  return(
                    <div key={cat} style={{marginBottom:10}}>
                      <div style={{fontSize:10,fontWeight:700,color:th.textSub,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6,paddingLeft:4}}>{cat}</div>
                      {items.map(function(item){return(
                        <div key={item.id} className="hov" style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",background:item.done?th.surface2:th.surface,border:"1px solid "+th.border,borderRadius:8,marginBottom:5,opacity:item.done?0.55:1}}>
                          <button onClick={function(){toggleShopItem(item.id);}} style={{width:20,height:20,minWidth:20,borderRadius:4,background:item.done?th.green:"none",border:"2px solid "+(item.done?th.green:th.border),cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:11}}>
                            {item.done?"✓":""}
                          </button>
                          <div style={{flex:1,fontSize:12,color:item.done?th.textMuted:th.text,textDecoration:item.done?"line-through":"none",fontFamily:"'Syne',sans-serif",fontWeight:600}}>{item.name}</div>
                          {item.recurring&&<span style={{fontSize:9,color:th.accent,background:th.accentSub,borderRadius:3,padding:"1px 5px"}}>regular</span>}
                          <button onClick={function(){removeShopItem(item.id);}} style={{background:"none",border:"none",color:th.textMuted,cursor:"pointer",fontSize:12,padding:0,lineHeight:1}}>x</button>
                        </div>
                      );})}
                    </div>
                  );
                })}
                <div style={{marginTop:8,fontSize:11,color:th.textMuted,textAlign:"center"}}>{shoppingList.filter(function(i){return !i.done;}).length+" items remaining · "+shoppingList.filter(function(i){return i.done;}).length+" ticked off"}</div>
              </div>
            )}
          </div>
        )}

        

        {/* CALENDAR */}
        {appMode==="cal"&&(
          <div className="fu">


            {/* Add / Edit Event Modal */}
            {(showAddEv||editEv)&&(
              <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
                <div style={{background:th.surface,border:"1px solid "+th.border,borderRadius:14,padding:20,width:"100%",maxWidth:420,boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800,color:th.text,marginBottom:14}}>{editEv?"Edit event":"Add calendar event"}</div>
                  <div style={{marginBottom:10}}>
                    <label style={lblSt()}>Event title</label>
                    <input type="text" value={editEv?editEv.title:newEv.title} onChange={function(e){var v=e.target.value;editEv?setEditEv(function(x){return Object.assign({},x,{title:v});}):setNewEv(function(x){return Object.assign({},x,{title:v});});}} placeholder="e.g. Parents evening" style={inpSt()}/>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
                    <div>
                      <label style={lblSt()}>Date</label>
                      <input type="date" value={editEv?editEv.date:newEv.date} onChange={function(e){var v=e.target.value;editEv?setEditEv(function(x){return Object.assign({},x,{date:v});}):setNewEv(function(x){return Object.assign({},x,{date:v});});}} style={inpSt({colorScheme:"light"})}/>
                    </div>
                    <div>
                      <label style={lblSt()}>Time (optional)</label>
                      <input type="time" value={editEv?editEv.time:newEv.time} onChange={function(e){var v=e.target.value;editEv?setEditEv(function(x){return Object.assign({},x,{time:v});}):setNewEv(function(x){return Object.assign({},x,{time:v});});}} style={inpSt({colorScheme:"light"})}/>
                    </div>
                  </div>
                  <div style={{marginBottom:10}}>
                    <label style={lblSt()}>Type</label>
                    <div style={{display:"flex",gap:6}}>
                      {["work","home","both"].map(function(t){
                        var cur=editEv?editEv.type:newEv.type;
                        var cols={work:"#378ADD",home:"#639922",both:"#7C3AED"};
                        return <button key={t} onClick={function(){editEv?setEditEv(function(x){return Object.assign({},x,{type:t});}):setNewEv(function(x){return Object.assign({},x,{type:t});});}} style={{flex:1,background:cur===t?cols[t]+"18":th.surface2,border:"1.5px solid "+(cur===t?cols[t]:th.border),borderRadius:7,padding:"6px 0",fontFamily:"inherit",fontSize:11,color:cur===t?cols[t]:th.textSub,fontWeight:cur===t?700:400,cursor:"pointer"}}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>;
                      })}
                    </div>
                  </div>
                  <div style={{marginBottom:16}}>
                    <label style={lblSt()}>Notes (optional)</label>
                    <input type="text" value={editEv?editEv.notes:newEv.notes} onChange={function(e){var v=e.target.value;editEv?setEditEv(function(x){return Object.assign({},x,{notes:v});}):setNewEv(function(x){return Object.assign({},x,{notes:v});});}} placeholder="Optional details" style={inpSt()}/>
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={function(){
                      if(editEv){
                        if(!editEv.title.trim()||!editEv.date)return;
                        setCalEvents2(function(p){return p.map(function(e){return e.id===editEv.id?editEv:e;});});
                        setEditEv(null);
                      } else {
                        if(!newEv.title.trim()||!newEv.date)return;
                        setCalEvents2(function(p){return p.concat([Object.assign({},newEv,{id:"ce"+Date.now()})]);});
                        setNewEv({title:"",date:"",time:"",type:"work",notes:""});
                        setShowAddEv(false);
                      }
                    }} style={{background:th.accent,color:th.accentText,border:"none",borderRadius:8,padding:"10px 0",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:12,cursor:"pointer",flex:1}}>{editEv?"Save changes":"Add event"}</button>
                    {editEv&&<button onClick={function(){setCalEvents2(function(p){return p.filter(function(e){return e.id!==editEv.id;});});setEditEv(null);}} style={{background:th.redBg,color:th.red,border:"1px solid "+th.red+"44",borderRadius:8,padding:"10px 14px",cursor:"pointer",fontFamily:"inherit",fontSize:12}}>Delete</button>}
                    <button onClick={function(){setShowAddEv(false);setEditEv(null);}} style={{background:th.surface2,border:"1px solid "+th.border,borderRadius:8,padding:"10px 14px",color:th.textSub,cursor:"pointer",fontFamily:"inherit",fontSize:12}}>Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {/* Week navigation */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,flexWrap:"wrap",gap:8}}>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:800,color:th.text,letterSpacing:"-0.01em"}}>
                  {calWk1&&calWk2?(function(){
                    var d1=new Date(calWk1.wc+"T12:00:00");
                    var d2=new Date(calWk2.wc+"T12:00:00");
                    var sun2=new Date(d2.getFullYear(),d2.getMonth(),d2.getDate()+6);
                    return d1.getDate()+" "+MOS[d1.getMonth()]+" – "+sun2.getDate()+" "+MOS[sun2.getMonth()]+" 2026";
                  })():""}
                </div>
                <div style={{fontSize:11,color:th.textMuted,marginTop:2}}>
                  {"Weeks "+(calPage*2+1)+" & "+(calPage*2+2)+" of "+SCHOOL_WEEKS.length+" · tap any day"}
                </div>
              </div>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <button onClick={function(){setCalPage(function(p){return Math.max(0,p-1);});}} disabled={calPage<=0} style={{background:th.surface2,border:"1px solid "+th.border,borderRadius:7,width:30,height:30,cursor:calPage<=0?"default":"pointer",color:calPage<=0?th.textMuted:th.text,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",opacity:calPage<=0?0.3:1}}>{"<"}</button>
                <button onClick={function(){setNewEv({title:"",date:calSel,time:"",type:"work",notes:""});setShowAddEv(true);}} style={{background:th.accent,color:th.accentText,border:"none",borderRadius:7,padding:"5px 12px",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:11,cursor:"pointer"}}>+ Event</button>
                <button onClick={function(){setCalPage(function(p){return Math.min(Math.ceil(SCHOOL_WEEKS.length/2)-1,p+1);});}} disabled={calPage>=Math.ceil(SCHOOL_WEEKS.length/2)-1} style={{background:th.surface2,border:"1px solid "+th.border,borderRadius:7,width:30,height:30,cursor:calPage>=Math.ceil(SCHOOL_WEEKS.length/2)-1?"default":"pointer",color:calPage>=Math.ceil(SCHOOL_WEEKS.length/2)-1?th.textMuted:th.text,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",opacity:calPage>=Math.ceil(SCHOOL_WEEKS.length/2)-1?0.3:1}}>{">"}</button>
              </div>
            </div>

            {/* Two-week strip */}
            {[calWk1,calWk2].filter(Boolean).map(function(wk,wi){
              var days=calWeekDays(wk.wc);
              var abCol=wk.ab==="A"?"#185FA5":"#3B6D11";
              var abBg=wk.ab==="A"?"#E6F1FB":"#EAF3DE";
              return(
                <div key={wi} style={{background:th.surface,border:"1px solid "+th.border,borderRadius:10,overflow:"hidden",marginBottom:8,boxShadow:"0 1px 4px "+th.shadow}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"5px 12px",background:th.surface2,borderBottom:"1px solid "+th.border}}>
                    <span style={{fontSize:10,fontWeight:700,background:abBg,color:abCol,padding:"2px 9px",borderRadius:10}}>{"Week "+wk.ab}</span>
                    <span style={{fontSize:10,color:th.textMuted}}>
                      {(function(){var d=new Date(wk.wc+"T12:00:00");return d.getDate()+" "+MOS[d.getMonth()];})()}
                      {" – "}
                      {(function(){var d=new Date(wk.wc+"T12:00:00");var sun=new Date(d.getFullYear(),d.getMonth(),d.getDate()+6);return sun.getDate()+" "+MOS[sun.getMonth()];})()}
                    </span>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)"}}>
                    {days.map(function(d){
                      var dk=dkStr(d);
                      var isWknd=d.getDay()===0||d.getDay()===6;
                      var isSel=dk===calSel;
                      var isToday=dk===calTodayStr;
                      var hw=calDayHasWork(dk);
                      var hh=calDayHasHome(dk);
                      var hc=calDayHasClash(dk);
                      var DOW_S=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
                      return(
                        <div key={dk} onClick={function(){setCalSel(dk);}} style={{borderRight:"1px solid "+th.border,cursor:"pointer",opacity:isWknd?0.6:1,background:isSel?"#E6F1FB":isToday?"#EEF5FF":th.surface,transition:"background 0.1s"}}>
                          <div style={{textAlign:"center",padding:"5px 2px 3px",borderBottom:"0.5px solid "+th.border}}>
                            <div style={{fontSize:9,fontWeight:500,color:isSel?"#185FA5":th.textMuted,marginBottom:1}}>{DOW_S[d.getDay()]}</div>
                            <div style={{fontSize:13,fontWeight:500,color:isSel||isToday?"#185FA5":th.text,lineHeight:1.2}}>{d.getDate()}</div>
                          </div>
                          <div style={{minHeight:28,padding:"3px",display:"flex",flexDirection:"column",gap:2}}>
                            {hw&&<div style={{height:3,borderRadius:2,background:"#378ADD"}}/>}
                            {hh&&<div style={{height:3,borderRadius:2,background:"#639922"}}/>}
                            {hc&&<div style={{height:3,borderRadius:2,background:"#BA7517"}}/>}
                            {calDayHasCustom(dk)&&<div style={{height:3,borderRadius:2,background:"#F59E0B"}}/>}
                            {calDayHasGcal(dk)&&<div style={{height:3,borderRadius:2,background:"#7C3AED"}}/>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Day agenda */}
            <div style={{background:th.surface,border:"1px solid "+th.border,borderRadius:10,overflow:"hidden",boxShadow:"0 1px 4px "+th.shadow}}>
              <div style={{padding:"10px 14px",borderBottom:"1px solid "+th.border,display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,flexWrap:"wrap"}}>
                <div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:th.text}}>
                    {(function(){var d=new Date(calSel+"T12:00:00");var abOfSel=null;for(var i=0;i<SCHOOL_WEEKS.length;i++){var sw=SCHOOL_WEEKS[i];if(calSel>=sw.wc&&calSel<=sw.ends){abOfSel=sw.ab;break;}}return DOWF2[d.getDay()]+", "+d.getDate()+" "+MOS[d.getMonth()]+(abOfSel?" · Week "+abOfSel:"");})()}
                  </div>
                  <div style={{fontSize:11,color:th.textMuted,marginTop:2}}>{calSelFiltered.length+" event"+(calSelFiltered.length===1?"":"s")}</div>
                </div>
                <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                  {["all","work","home","clash"].map(function(f){
                    var isOn=calFilter===f;
                    var onBg=f==="home"?"#EAF3DE":f==="clash"?"#FAEEDA":"#E6F1FB";
                    var onCol=f==="home"?"#27500A":f==="clash"?"#633806":"#0C447C";
                    var onBd=f==="home"?"#97C459":f==="clash"?"#EF9F27":"#85B7EB";
                    return(
                      <button key={f} onClick={function(){setCalFilter(f);}} style={{fontSize:11,padding:"3px 10px",borderRadius:10,cursor:"pointer",border:"0.5px solid "+(isOn?onBd:th.border),background:isOn?onBg:"none",color:isOn?onCol:th.textSub,fontFamily:"inherit",fontWeight:isOn?600:400}}>
                        {f.charAt(0).toUpperCase()+f.slice(1)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {calSelFiltered.length===0?(
                <div style={{padding:"28px",textAlign:"center",color:th.textMuted,fontSize:13}}>No events for this day</div>
              ):(
                <div style={{padding:"10px 14px",display:"flex",flexDirection:"column",gap:4}}>
                  {calSelFiltered.map(function(e,ei){
                    var isCl=e.clash;
                    var barC=e.t==="home"?"#639922":e.t==="form"?"#97C459":e.barColor||"#378ADD";
                    var rowBg=isCl?"#FAEEDA":e.t==="home"?e.bgColor||"#EAF3DE":e.bgColor||th.surface;
                    var rowBd=isCl?"#EF9F27":th.border;
                    var srcIcon=e.source==="timetable"?"📚":e.source==="meeting"?"📆":e.source==="task"?"✅":e.source==="club"?"🏃":"•";
                    return(
                      <div key={ei} style={{display:"flex",gap:8,padding:"8px 10px",borderRadius:8,border:"0.5px solid "+rowBd,background:rowBg}}>
                        <div style={{fontSize:11,color:th.textMuted,fontFamily:"'DM Mono',monospace",minWidth:60,paddingTop:1,flexShrink:0}}>{e.isDue?"Due":e.time}</div>
                        <div style={{width:3,borderRadius:2,minHeight:30,flexShrink:0,background:barC}}/>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:13,fontWeight:600,color:th.text,fontFamily:"'Syne',sans-serif",marginBottom:2,display:"flex",alignItems:"center",gap:5,flexWrap:"wrap"}}>
                            <span>{e.title}</span>
                            {isCl&&<span style={{fontSize:10,padding:"1px 6px",borderRadius:8,background:"#FAEEDA",color:"#633806",border:"0.5px solid #EF9F27"}}>Clash</span>}
                            {e.t==="work"&&!isCl&&<span style={{fontSize:10,padding:"1px 6px",borderRadius:8,background:"#E6F1FB",color:"#0C447C"}}>Work</span>}
                            {e.t==="home"&&!e.canSkip&&<span style={{fontSize:10,padding:"1px 6px",borderRadius:8,background:"#EAF3DE",color:"#27500A"}}>Home</span>}
                            {e.canSkip&&<span style={{fontSize:10,padding:"1px 6px",borderRadius:8,background:"#EAF3DE",color:"#27500A"}}>Club</span>}
                            {e.t==="gcal"&&<span style={{fontSize:10,padding:"1px 6px",borderRadius:8,background:"#F3E8FF",color:"#4C1D95"}}>Google Cal</span>}
                          </div>
                          <div style={{fontSize:11,color:th.textMuted}}>{srcIcon+" "+e.sub}</div>
                            {e.canSkip&&<button onClick={function(){skipClubOccurrence(e.clubId,calSel);}} style={{marginTop:4,background:"none",border:"1px solid "+th.red+"44",borderRadius:5,padding:"2px 8px",fontSize:10,color:th.red,cursor:"pointer",fontFamily:"inherit"}}>Skip this occurrence</button>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div style={{display:"flex",gap:12,padding:"7px 14px",borderTop:"1px solid "+th.border,flexWrap:"wrap"}}>
                {[{c:"#378ADD",l:"Work / Timetable"},{c:"#639922",l:"Home"},{c:"#97C459",l:"Form reg"},{c:"#BA7517",l:"Clash"},{c:"#F59E0B",l:"Custom event"},{c:"#7C3AED",l:"Google Calendar"}].map(function(x,i){return(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:th.textMuted}}>
                    <div style={{width:10,height:3,borderRadius:2,background:x.c}}/>
                    {x.l}
                  </div>
                );})}
              </div>
            </div>

          </div>
        )}


        {/* HOME SETTINGS */}
        {appMode==="home"&&view==="h-settings"&&(
          <div className="fu">
            <div style={{marginBottom:18}}>
              <div style={{fontSize:12,fontWeight:700,color:th.textSub,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:2}}>Home Settings</div>
              <div style={{fontSize:11,color:th.textMuted}}>Changes apply instantly</div>
            </div>

            {HomeSection("h-appearance","Appearance","🎨",
              React.createElement("div",{style:{paddingTop:12}},
                React.createElement("label",{style:lblSt()},"Home colour theme"),
                React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:16}},
                  Object.keys(HOME_THEMES).map(function(key){
                    var t=HOME_THEMES[key]; var isSel=homeSettings.homeTheme===key;
                    return React.createElement("button",{key:key,onClick:function(){setHSt("homeTheme",key);},style:{background:isSel?t.accent+"14":th.surface2,border:"2px solid "+(isSel?t.accent:th.border),borderRadius:10,padding:"10px 12px",cursor:"pointer",textAlign:"left",boxShadow:isSel?"0 2px 10px "+t.accent+"33":"none",transition:"all 0.18s"}},
                      React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}},
                        React.createElement("div",{style:{fontSize:12,fontWeight:700,color:isSel?t.accent:th.text}},t.icon+" "+t.name),
                        isSel?React.createElement("span",{style:{fontSize:10,color:t.accent,fontWeight:700}},"Active"):null
                      ),
                      React.createElement("div",{style:{fontSize:10,color:th.textMuted,marginBottom:6}},t.vibe),
                      React.createElement("div",{style:{display:"flex",gap:4}},
                        [t.accent,t.green,t.amber,t.text].map(function(c,i){return React.createElement("div",{key:i,style:{width:11,height:11,borderRadius:"50%",background:c,border:"1.5px solid "+th.border}});})
                      )
                    );
                  })
                ),
                React.createElement("label",{style:lblSt()},"Font style"),
                React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:8}},
                  Object.keys(HOME_FONT_OPTIONS).map(function(key){
                    var f=HOME_FONT_OPTIONS[key]; var isSel=homeSettings.homeFont===key;
                    return React.createElement("button",{key:key,onClick:function(){setHSt("homeFont",key);},style:{background:isSel?th.accentSub:th.surface2,border:"1.5px solid "+(isSel?th.accent:th.border),borderRadius:9,padding:"12px 14px",cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all 0.15s"}},
                      React.createElement("div",null,
                        React.createElement("div",{style:{fontFamily:f.css,fontSize:15,fontWeight:700,color:isSel?th.accent:th.text,marginBottom:2}},f.name),
                        React.createElement("div",{style:{fontFamily:f.css,fontSize:12,color:th.textMuted,marginBottom:2}},"The quick brown fox jumps — Aa Bb Cc 123"),
                        React.createElement("div",{style:{fontSize:10,color:th.textMuted}},f.label)
                      ),
                      isSel?React.createElement("span",{style:{fontSize:16,color:th.accent}},"✓"):null
                    );
                  })
                )
              )
            )}

            {HomeSection("h-family","Family Members","👨‍👩‍👧",
              React.createElement("div",{style:{paddingTop:12}},
                React.createElement("div",{style:{fontSize:11,color:th.textMuted,marginBottom:10}},"Set names so they appear throughout your home app"),
                family.map(function(m){
                  var COLOURS=["#3B5BDB","#EC4899","#F97316","#10B981","#8B5CF6","#EF4444","#0EA5E9","#CA8A04"];
                  return React.createElement("div",{key:m.id,style:{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderTop:"1px solid "+th.border}},
                    React.createElement("div",{style:{width:36,height:36,borderRadius:"50%",background:m.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"white",fontWeight:700,flexShrink:0}},(m.name||m.role).charAt(0).toUpperCase()),
                    React.createElement("div",{style:{flex:1}},
                      React.createElement("div",{style:{display:"flex",gap:6,marginBottom:4}},
                        React.createElement("input",{type:"text",value:m.name,onChange:function(e){updateFamilyName(m.id,e.target.value);},placeholder:"Name",style:inpSt({fontSize:12,padding:"6px 10px",flex:1})}),
                        React.createElement("input",{type:"text",value:m.role,onChange:function(e){updateFamilyRole(m.id,e.target.value);},placeholder:"Role/Age",style:inpSt({fontSize:12,padding:"6px 10px",width:90})})
                      )
                    ),
                    React.createElement("div",{style:{display:"flex",flexWrap:"wrap",gap:4,maxWidth:80}},
                      COLOURS.map(function(c){return React.createElement("button",{key:c,onClick:function(){setFamily(function(prev){return prev.map(function(fam){return fam.id===m.id?Object.assign({},fam,{color:c}):fam;});});},style:{width:16,height:16,borderRadius:"50%",background:c,border:m.color===c?"2.5px solid "+th.text:"2px solid "+th.border,cursor:"pointer"}});})
                    )
                  );
                })
              )
            )}

            {HomeSection("h-homedata","Reset Data","📦",
              React.createElement("div",{style:{paddingTop:12,display:"flex",flexDirection:"column",gap:8}},
                [
                  {label:"Reset clubs",sub:clubs.length+" activities",action:function(){setClubs(INIT_CLUBS);},col:th.amber,bg:th.amberBg},
                  {label:"Reset finances",sub:"Clear income, expenses and savings",action:function(){setFinances(INIT_FINANCES);},col:th.amber,bg:th.amberBg},
                  {label:"Reset meal plan",sub:"Clear this week",action:function(){setMealPlan(INIT_MEAL_PLAN);},col:th.amber,bg:th.amberBg},
                  {label:"Reset shopping list",sub:shoppingList.length+" items",action:function(){setShoppingList(INIT_SHOPPING);},col:th.amber,bg:th.amberBg},
                  {label:"Reset all home settings",sub:"Restore theme, font and family names to defaults",action:function(){setHomeSettings(INIT_HOME_SETTINGS);setFamily(INIT_FAMILY);},col:th.red,bg:th.redBg},
                ].map(function(item,i){
                  return React.createElement("div",{key:i,style:{background:th.surface2,border:"1px solid "+th.border,borderRadius:8,padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap"}},
                    React.createElement("div",null,
                      React.createElement("div",{style:{fontSize:12,color:th.text,fontWeight:600,marginBottom:2}},item.label),
                      React.createElement("div",{style:{fontSize:10,color:th.textMuted}},item.sub)
                    ),
                    React.createElement("button",{onClick:item.action,style:{background:item.bg,color:item.col,border:"1px solid "+item.col+"44",borderRadius:6,padding:"6px 14px",fontSize:11,cursor:"pointer",fontFamily:"inherit",fontWeight:600,whiteSpace:"nowrap"}},item.label.split(" ").slice(0,2).join(" "))
                  );
                })
              )
            )}

            <div style={{marginTop:8,fontSize:11,color:th.textMuted,textAlign:"center"}}>All settings stored for this session</div>
          </div>
        )}


        {/* ═══════════════ HOME EMAIL ═══════════════ */}
        {appMode==="home"&&view==="h-email"&&(
          <div className="fu">
            <div style={{marginBottom:16}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:th.textSub,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:2}}>Personal Email</div>
              <div style={{fontSize:11,color:th.textMuted}}>Connect your personal Gmail to get AI summaries and auto-task creation</div>
            </div>
            <div style={card({textAlign:"center",padding:"40px 20px"})}>
              <div style={{fontSize:40,marginBottom:12}}>📬</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,color:th.text,marginBottom:8}}>Connect your personal Gmail</div>
              <div style={{fontSize:12,color:th.textMuted,marginBottom:20,lineHeight:1.7,maxWidth:380,margin:"0 auto 20px"}}>
                Once connected, I will summarise incoming emails, extract any tasks or calendar events, and draft replies in a personal (not professional) tone.
              </div>
              <div style={{background:th.accentSub,border:"1px solid "+th.accent+"33",borderRadius:10,padding:"16px 18px",maxWidth:420,margin:"0 auto",textAlign:"left"}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:700,color:th.accent,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>How to connect</div>
                <div style={{fontSize:11,color:th.textSub,lineHeight:1.8}}>
                  1. In Claude settings, go to <strong>Connected apps</strong><br/>
                  2. Find Gmail and click Connect<br/>
                  3. Sign in with your personal account<br/>
                  4. Come back here and tap below
                </div>
              </div>
              <div style={{marginTop:20,fontSize:11,color:th.textMuted,lineHeight:1.6}}>Your work email processor (in 📬 Email on the work side) stays separate. This is purely for personal use.</div>
            </div>
          </div>
        )}


        {/* TIMETABLE */}
        {appMode==="work"&&view==="timetable"&&(
          <div className="fu">

            {/* Header + week nav */}
            {(function(){
              var wk = SCHOOL_WEEKS[ttWeekIdx]||SCHOOL_WEEKS[0];
              var ab = wk.ab;
              var abCol = ab==="A"?th.accent:"#E11D48";
              var abBg  = ab==="A"?th.accentSub:"#FFF1F2";
              var wcDate = new Date(wk.wc);
              var enDate = new Date(wk.ends);
              var fmtRange = wcDate.getDate()+" "+TT_MONTHS[wcDate.getMonth()]+" - "+enDate.getDate()+" "+TT_MONTHS[enDate.getMonth()]+" 2026";
              var todayStr = TODAY.toISOString().split("T")[0];
              var todayInWk = todayStr>=wk.wc && todayStr<=wk.ends;
              var dayNames=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
              var todayKeyInWk = todayInWk ? dayNames[TODAY.getDay()] : null;

              return React.createElement("div",null,

                /* week nav bar */
                React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:8}},
                  React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
                    React.createElement("button",{onClick:function(){setTTWeekIdx(function(i){return Math.max(0,i-1);});},disabled:ttWeekIdx===0,style:{background:th.surface2,border:"1px solid "+th.border,borderRadius:7,width:32,height:32,cursor:ttWeekIdx===0?"default":"pointer",color:ttWeekIdx===0?th.textMuted:th.text,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}},"<"),
                    React.createElement("div",{style:{textAlign:"center"}},
                      React.createElement("div",{style:{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:800,color:th.text,letterSpacing:"-0.01em"}},fmtRange),
                      React.createElement("div",{style:{fontSize:10,color:th.textMuted,marginTop:1}},"Week "+(ttWeekIdx+1)+" of "+SCHOOL_WEEKS.length+(wk.note?" · "+wk.note:""))
                    ),
                    React.createElement("button",{onClick:function(){setTTWeekIdx(function(i){return Math.min(SCHOOL_WEEKS.length-1,i+1);});},disabled:ttWeekIdx===SCHOOL_WEEKS.length-1,style:{background:th.surface2,border:"1px solid "+th.border,borderRadius:7,width:32,height:32,cursor:ttWeekIdx===SCHOOL_WEEKS.length-1?"default":"pointer",color:ttWeekIdx===SCHOOL_WEEKS.length-1?th.textMuted:th.text,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}},">")
                  ),
                  React.createElement("div",{style:{display:"flex",gap:6,alignItems:"center"}},
                    React.createElement("div",{style:{background:abBg,border:"2px solid "+abCol,borderRadius:8,padding:"4px 14px",fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800,color:abCol}},
                      "Week "+ab
                    ),
                    !todayInWk?React.createElement("button",{onClick:function(){var idx=SCHOOL_WEEKS.findIndex(function(w){return TODAY.toISOString().split('T')[0]>=w.wc&&TODAY.toISOString().split('T')[0]<=w.ends;});if(idx>=0)setTTWeekIdx(idx);},style:{background:th.accentSub,border:"1px solid "+th.accent+"44",borderRadius:6,padding:"4px 10px",fontSize:10,color:th.accent,cursor:"pointer",fontFamily:"inherit",fontWeight:600}},"Today"):null
                  )
                ),

                /* Today banner */
                todayInWk&&todayKeyInWk&&React.createElement("div",{style:{background:th.accentSub,border:"1px solid "+th.accent+"44",borderRadius:9,padding:"8px 14px",marginBottom:12,display:"flex",alignItems:"center",gap:8}},
                  React.createElement("span",{style:{fontSize:14}},"📍"),
                  React.createElement("div",{style:{fontSize:11,color:th.accent,fontWeight:600,fontFamily:"'Syne',sans-serif"}},"Today is "+TT_DAY_FULL[todayKeyInWk]+" — "+
                    (function(){var ps=PERIODS.filter(function(p){return !p.reg;});var day=TT[ab][todayKeyInWk];var lessons=ps.filter(function(p){var s=day[p.id];return s&&s.t!=="ppa"&&s.t!=="free";});return lessons.length+" "+(lessons.length===1?"lesson":"lessons")+" to teach";})()+
                    " · form registration AM & PM"
                  )
                ),

                /* Day tabs */
                React.createElement("div",{style:{display:"flex",gap:4,marginBottom:12,flexWrap:"wrap"}},
                  TT_DAYS.map(function(d){
                    var isToday=todayInWk&&d===todayKeyInWk;
                    var dayLessons=PERIODS.filter(function(p){return !p.reg&&TT[ab][d][p.id]&&TT[ab][d][p.id].t!=="free"&&TT[ab][d][p.id].t!=="ppa";}).length;
                    return React.createElement("button",{key:d,className:"nb",onClick:function(){setTTDay(d);},style:{
                      background:ttDay===d?th.accent:isToday?th.accentSub:th.surface2,
                      color:ttDay===d?th.accentText:isToday?th.accent:th.textSub,
                      border:"1px solid "+(ttDay===d?th.accent:isToday?th.accent+"55":th.border),
                      borderRadius:8,padding:"6px 12px",fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:ttDay===d?700:400,
                      display:"flex",flexDirection:"column",alignItems:"center",gap:1
                    }},
                      React.createElement("span",null,d),
                      React.createElement("span",{style:{fontSize:8,opacity:0.7}},dayLessons+"L")
                    );
                  })
                ),

                /* Day detail view */
                React.createElement("div",null,
                  PERIODS.map(function(period){
                    var slot = TT[ab][ttDay][period.id];
                    if(!slot) return null;
                    var col = LC[slot.t]||LC.free;
                    var isReg = period.reg;
                    var isFree = slot.t==="free";
                    var isPPA = slot.t==="ppa";

                    return React.createElement("div",{key:period.id,style:{
                      display:"flex",alignItems:"stretch",gap:0,marginBottom:6,borderRadius:9,overflow:"hidden",
                      border:"1px solid "+(isReg?"#16A34A44":col.bd+"66"),
                      opacity:isFree?0.5:1,
                      boxShadow:"0 1px 4px "+th.shadow
                    }},
                      /* Time strip */
                      React.createElement("div",{style:{
                        background:isReg?"#DCFCE7":col.bg,
                        borderRight:"2px solid "+(isReg?"#16A34A":col.bd),
                        padding:"8px 10px",display:"flex",flexDirection:"column",
                        justifyContent:"center",alignItems:"center",minWidth:62,
                        gap:1
                      }},
                        React.createElement("div",{style:{fontSize:9,color:isReg?"#14532D":col.tx,fontWeight:700,letterSpacing:"0.04em"}},(isReg?"REG":period.label.replace("Period ","P"))),
                        React.createElement("div",{style:{fontSize:9,color:isReg?"#16A34A":col.bd,fontFamily:"'DM Mono',monospace"}},(period.start)),
                        React.createElement("div",{style:{fontSize:8,color:isReg?"#16A34A99":col.bd+"99"}},("–"+period.end))
                      ),
                      /* Content */
                      React.createElement("div",{style:{
                        flex:1,background:isReg?"#F0FDF4":isFree?"#F8FAFC":col.bg+"88",
                        padding:"8px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8
                      }},
                        React.createElement("div",null,
                          React.createElement("div",{style:{
                            fontFamily:"'Syne',sans-serif",fontSize:isReg?11:13,fontWeight:isReg?600:700,
                            color:isReg?"#14532D":isFree?th.textMuted:col.tx,
                            marginBottom:slot.g||slot.n?3:0
                          }},slot.l),
                          slot.g&&React.createElement("div",{style:{fontSize:10,color:col.bd,fontWeight:600}},slot.g),
                          slot.n&&React.createElement("div",{style:{fontSize:10,color:col.bd,fontStyle:"italic",marginTop:2}},"+ "+slot.n)
                        ),
                        !isReg&&!isFree&&!isPPA&&React.createElement("div",{style:{
                          background:col.bd+"18",border:"1px solid "+col.bd+"44",borderRadius:5,
                          padding:"2px 8px",fontSize:9,color:col.tx,fontWeight:700,letterSpacing:"0.06em",flexShrink:0
                        }},col.name)
                      )
                    );
                  })
                ),

                /* Week overview mini-grid */
                React.createElement("div",{style:{marginTop:16,background:th.surface,border:"1px solid "+th.border,borderRadius:10,overflow:"hidden"}},
                  React.createElement("div",{style:{padding:"10px 14px 6px",fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:700,color:th.textMuted,letterSpacing:"0.1em",textTransform:"uppercase"}},
                    "Week at a glance"
                  ),
                  React.createElement("div",{style:{display:"grid",gridTemplateColumns:"auto repeat(5,1fr)",borderTop:"1px solid "+th.border}},
                    /* header row */
                    React.createElement("div",{style:{padding:"6px 10px",background:th.surface2,borderRight:"1px solid "+th.border,fontSize:9,color:th.textMuted,fontFamily:"'DM Mono',monospace"}},""),
                    TT_DAYS.map(function(d){
                      var isToday=todayInWk&&d===todayKeyInWk;
                      var isSel=ttDay===d;
                      return React.createElement("div",{key:d,onClick:function(){setTTDay(d);},style:{
                        padding:"6px 4px",background:isSel?th.accent:isToday?th.accentSub:th.surface2,
                        color:isSel?th.accentText:isToday?th.accent:th.textSub,
                        textAlign:"center",fontSize:9,fontWeight:700,cursor:"pointer",
                        borderRight:"1px solid "+th.border,borderBottom:"1px solid "+th.border,
                        fontFamily:"'Syne',sans-serif"
                      }},d);
                    }),
                    /* period rows - only teaching periods */
                    PERIODS.filter(function(p){return !p.reg;}).map(function(period){
                      return [
                        React.createElement("div",{key:period.id+"_lbl",style:{padding:"5px 8px",background:th.surface2,borderRight:"1px solid "+th.border,borderBottom:"1px solid "+th.border,fontSize:8,color:th.textMuted,fontFamily:"'DM Mono',monospace",display:"flex",alignItems:"center"}},period.label.replace("Period ","P")),
                        TT_DAYS.map(function(d){
                          var slot=TT[ab][d][period.id];
                          var col=slot?LC[slot.t]||LC.free:LC.free;
                          var isSel=ttDay===d;
                          return React.createElement("div",{key:period.id+"_"+d,onClick:function(){setTTDay(d);},style:{
                            padding:"5px 3px",background:slot&&slot.t!=="free"?col.bg:(isSel?th.surface2+"88":th.surface),
                            borderRight:"1px solid "+th.border,borderBottom:"1px solid "+th.border,
                            fontSize:8,color:slot?col.tx:th.textMuted,textAlign:"center",cursor:"pointer",
                            fontWeight:600,overflow:"hidden",
                            lineHeight:1.2
                          }},slot&&slot.t!=="free"?(slot.l.replace("Year ","Y").replace("PPA","PPA").replace("Form ","").replace("PSHE ","P:")+" "+(slot.g||"")):"—");
                        })
                      ];
                    })
                  )
                )

              );
            })()}

            {/* Colour key */}
            <div style={{marginTop:14,display:"flex",flexWrap:"wrap",gap:5}}>
              {Object.keys(LC).map(function(k){var c=LC[k];return React.createElement("div",{key:k,style:{display:"flex",alignItems:"center",gap:5,background:c.bg,border:"1px solid "+c.bd+"66",borderRadius:5,padding:"3px 8px"}},React.createElement("div",{style:{width:8,height:8,borderRadius:"50%",background:c.bd,flexShrink:0}}),React.createElement("span",{style:{fontSize:9,color:c.tx,fontWeight:600}},(c.name)));})  }
            </div>

          </div>
        )}


        {/* MEETINGS */}
        {appMode==="work"&&view==="meetings"&&(
          <div className="fu">

            {/* "Add to agenda" banner — triggered from email processor */}
            {addToMtgPoint&&(
              <div style={{background:"#F3E8FF",border:"1.5px solid #8B5CF6",borderRadius:10,padding:"12px 16px",marginBottom:16}} className="fu">
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:"#8B5CF6",marginBottom:8}}>Add to meeting agenda</div>
                <div style={{fontSize:12,color:"#4A4A40",background:"white",border:"1px solid #C7D2FE",borderRadius:7,padding:"8px 12px",marginBottom:10,lineHeight:1.5}}>{addToMtgPoint}</div>
                <div style={{fontSize:11,color:"#64748B",marginBottom:8}}>Select which meeting to add this to:</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
                  {meetings.map(function(m){return(
                    <button key={m.id} onClick={function(){addEmailPointToMeeting(m.id,addToMtgPoint);setSelMtId(m.id);}} style={{background:m.color+"18",border:"1px solid "+m.color+"55",borderRadius:7,padding:"6px 12px",cursor:"pointer",fontFamily:"inherit",fontSize:11,color:m.color,fontWeight:600}}>
                      {m.name}
                    </button>
                  );})}
                </div>
                <button onClick={function(){setAddToMtgPoint(null);}} style={{background:"none",border:"1px solid #C7D2FE",borderRadius:6,padding:"4px 12px",fontSize:11,color:"#8B5CF6",cursor:"pointer",fontFamily:"inherit"}}>Cancel</button>
              </div>
            )}

            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16,flexWrap:"wrap",gap:10}}>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:th.textSub,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:2}}>Recurring Meetings</div>
                <div style={{fontSize:11,color:th.textMuted}}>Build agendas, generate documents, add to Google Calendar</div>
              </div>
              <button onClick={function(){setShowAddMeeting(function(s){return !s;});}} style={{background:showAddMeeting?th.accent:th.accentSub,color:showAddMeeting?th.accentText:th.accent,border:"1px solid "+th.accent+"55",borderRadius:8,padding:"7px 14px",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:11,cursor:"pointer"}}>
                {showAddMeeting?"Cancel":"+ New meeting"}
              </button>
            </div>

            {/* Add new meeting form */}
            {showAddMeeting&&(
              <div style={card({marginBottom:16})} className="fu">
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:700,color:th.textSub,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:12}}>New recurring meeting</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
                  <div style={{gridColumn:"span 2"}}><label style={lblSt()}>Meeting name</label><input type="text" value={newMtg.name} onChange={function(e){var v=e.target.value;setNewMtg(function(m){return Object.assign({},m,{name:v});});}} placeholder="e.g. Year 11 Intervention Meeting" style={inpSt()}/></div>
                  <div><label style={lblSt()}>Day</label><select value={newMtg.day} onChange={function(e){var v=e.target.value;setNewMtg(function(m){return Object.assign({},m,{day:v});});}} style={selSt()}>{["Mon","Tue","Wed","Thu","Fri"].map(function(d){return <option key={d} value={d}>{d}</option>;})}</select></div>
                  <div><label style={lblSt()}>Time</label><input type="time" value={newMtg.time} onChange={function(e){var v=e.target.value;setNewMtg(function(m){return Object.assign({},m,{time:v});});}} style={inpSt({colorScheme:"light"})}/></div>
                  <div><label style={lblSt()}>Frequency</label><select value={newMtg.frequency} onChange={function(e){var v=e.target.value;setNewMtg(function(m){return Object.assign({},m,{frequency:v});});}} style={selSt()}><option value="weekly">Weekly</option><option value="fortnightly">Fortnightly</option><option value="halfTermly">Half-termly</option></select></div>
                  <div><label style={lblSt()}>Colour</label><div style={{display:"flex",gap:6,marginTop:4}}>{["#8B5CF6","#0EA5E9","#F97316","#10B981","#EC4899","#EF4444"].map(function(c){return(<button key={c} onClick={function(){setNewMtg(function(m){return Object.assign({},m,{color:c});});}} style={{width:24,height:24,borderRadius:"50%",background:c,border:newMtg.color===c?"3px solid "+th.text:"2px solid "+th.border,cursor:"pointer"}}/> );})}</div></div>
                  <div style={{gridColumn:"span 2"}}><label style={lblSt()}>Attendees</label><input type="text" value={newMtg.attendees} onChange={function(e){var v=e.target.value;setNewMtg(function(m){return Object.assign({},m,{attendees:v});});}} placeholder="e.g. All science staff" style={inpSt()}/></div>
                  <div style={{gridColumn:"span 2"}}><label style={lblSt()}>Location</label><input type="text" value={newMtg.location} onChange={function(e){var v=e.target.value;setNewMtg(function(m){return Object.assign({},m,{location:v});});}} placeholder="e.g. Science office" style={inpSt()}/></div>
                </div>
                <button onClick={addMeeting} disabled={!newMtg.name.trim()} style={{background:newMtg.name.trim()?th.accent:th.surface2,color:newMtg.name.trim()?th.accentText:th.textMuted,border:"none",borderRadius:8,padding:"9px 22px",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:12,cursor:newMtg.name.trim()?"pointer":"default"}}>Create Meeting</button>
              </div>
            )}

            {/* Meeting selector tabs */}
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
              {meetings.map(function(mt){
                var pts=(agenda[mt.id]||[]).filter(function(p){return !p.done;}).length;
                var isSel=selMtId===mt.id;
                return(
                  <button key={mt.id} className="nb" onClick={function(){setSelMtId(mt.id);setAgendaOutput("");setCalMsg("");}} style={{background:isSel?mt.color+"18":th.surface2,color:isSel?mt.color:th.textSub,border:"2px solid "+(isSel?mt.color:mt.color+"33"),borderRadius:8,padding:"8px 14px",fontFamily:"'DM Mono',monospace",fontSize:11,display:"flex",alignItems:"center",gap:7,fontWeight:isSel?600:400,boxShadow:isSel?"0 2px 10px "+mt.color+"22":"none"}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:mt.color,flexShrink:0}}/>
                    <span>{mt.name}</span>
                    {pts>0&&<span style={{background:mt.color+"22",color:mt.color,borderRadius:10,padding:"1px 7px",fontSize:9,fontWeight:700}}>{pts}</span>}
                  </button>
                );
              })}
            </div>

            {/* Selected meeting detail */}
            {meetings.filter(function(m){return m.id===selMtId;}).map(function(mt){
              var pts=agenda[mt.id]||[];
              var activePts=pts.filter(function(p){return !p.done;});
              var donePts=pts.filter(function(p){return p.done;});
              return(
                <div key={mt.id}>
                  {/* Meeting info bar */}
                  <div style={card({marginBottom:14,borderLeft:"3px solid "+mt.color})}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}>
                      <div>
                        <div style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:800,color:mt.color,marginBottom:4}}>{mt.name}</div>
                        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                          <span style={{fontSize:11,color:th.textSub}}>{"📅 "+mt.day+" at "+mt.time}</span>
                          <span style={{fontSize:11,color:th.textSub}}>{"🔁 "+FREQ_LABELS[mt.frequency]}</span>
                          {mt.attendees&&<span style={{fontSize:11,color:th.textSub}}>{"👥 "+mt.attendees}</span>}
                          {mt.location&&<span style={{fontSize:11,color:th.textSub}}>{"📍 "+mt.location}</span>}
                        </div>
                      </div>
                      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                        <button onClick={generateAgenda} disabled={agendaGenLoading||activePts.length===0} style={{background:agendaGenLoading||activePts.length===0?th.surface2:mt.color,color:agendaGenLoading||activePts.length===0?th.textMuted:"white",border:"none",borderRadius:7,padding:"7px 14px",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:11,cursor:agendaGenLoading||activePts.length===0?"default":"pointer"}}>
                          {agendaGenLoading?"Generating...":"Generate agenda"}
                        </button>
                        <button onClick={addToCalendar} disabled={calLoading} style={{background:calLoading?th.surface2:th.greenBg,color:calLoading?th.textMuted:th.green,border:"1px solid "+th.green+"44",borderRadius:7,padding:"7px 12px",fontFamily:"inherit",fontWeight:600,fontSize:11,cursor:calLoading?"wait":"pointer"}}>
                          {calLoading?"Adding...":"📅 Add to Calendar"}
                        </button>
                        <button onClick={function(){if(window.confirm("Remove this meeting?"))removeMeeting(mt.id);}} style={{background:"none",border:"1px solid "+th.red+"44",borderRadius:7,padding:"7px 10px",color:th.red,cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>Remove</button>
                      </div>
                    </div>
                    {calMsg&&<div style={{marginTop:10,fontSize:11,color:th.green,background:th.greenBg,border:"1px solid "+th.green+"44",borderRadius:6,padding:"6px 10px",lineHeight:1.5}}>{calMsg}</div>}
                  </div>

                  {/* Generated agenda output */}
                  {agendaOutput&&(
                    <div style={card({marginBottom:14,overflow:"hidden",padding:0})} className="fu">
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:mt.color+"12",borderBottom:"1px solid "+mt.color+"22"}}>
                        <div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:7,height:7,borderRadius:"50%",background:mt.color}}/><span style={{fontSize:10,fontWeight:700,color:mt.color,letterSpacing:"0.09em",textTransform:"uppercase"}}>Generated agenda - ready to share</span></div>
                        <button onClick={function(){navigator.clipboard.writeText(agendaOutput).then(function(){setAgendaCopied(true);setTimeout(function(){setAgendaCopied(false);},2500);}).catch(function(){});}} style={{background:agendaCopied?mt.color:"white",color:agendaCopied?"white":th.textSub,border:"1px solid "+(agendaCopied?mt.color:th.border),borderRadius:6,padding:"4px 12px",fontSize:11,fontFamily:"'Syne',sans-serif",fontWeight:600,cursor:"pointer"}}>{agendaCopied?"Copied!":"Copy"}</button>
                      </div>
                      <div style={{padding:"14px",fontSize:12,color:th.text,lineHeight:1.8,whiteSpace:"pre-wrap",maxHeight:400,overflowY:"auto"}}>{agendaOutput}</div>
                    </div>
                  )}

                  {/* Add agenda point */}
                  <div style={card({marginBottom:14})}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:700,color:th.textMuted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10}}>Add agenda point</div>
                    <div style={{display:"flex",gap:8,marginBottom:8,flexWrap:"wrap"}}>
                      <input type="text" value={newAgPoint} onChange={function(e){setNewAgPoint(e.target.value);}} onKeyDown={function(e){if(e.key==="Enter"&&newAgPoint.trim()){addAgendaPoint(mt.id,newAgPoint,newAgPri,"manual");setNewAgPoint("");}}} placeholder="Type an agenda point and press Enter..." style={inpSt({flex:1,fontSize:12,minWidth:200})}/>
                  {MicBtn(setNewAgPoint,"agenda-pt")}
                      <select value={newAgPri} onChange={function(e){setNewAgPri(e.target.value);}} style={selSt({width:"auto",minWidth:100})}>
                        {Object.keys(PRIS).map(function(k){return <option key={k} value={k}>{PRIS[k].label}</option>;})}
                      </select>
                      <button onClick={function(){if(newAgPoint.trim()){addAgendaPoint(mt.id,newAgPoint,newAgPri,"manual");setNewAgPoint("");}}} disabled={!newAgPoint.trim()} style={{background:newAgPoint.trim()?mt.color:th.surface2,color:newAgPoint.trim()?"white":th.textMuted,border:"none",borderRadius:8,padding:"0 16px",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:12,cursor:newAgPoint.trim()?"pointer":"default",whiteSpace:"nowrap"}}>Add</button>
                    </div>
                  </div>


            {/* Edit agenda point */}
            {editAgPt&&editAgPt.mtId===mt.id&&(
              <div className="fu" style={card({marginBottom:10,borderLeft:"3px solid "+mt.color,background:th.accentSub})} >
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:700,color:th.accent,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8}}>Edit agenda point</div>
                <div style={{display:"flex",gap:6,marginBottom:8}}>
                  <input type="text" value={editAgPt.pt.point} onChange={function(e){var v=e.target.value;setEditAgPt(function(ap){return Object.assign({},ap,{pt:Object.assign({},ap.pt,{point:v})});});}} style={inpSt({flex:1,fontSize:12})}/>
                  {MicBtn(function(fn){setEditAgPt(function(ap){var v=typeof fn==="function"?fn(ap.pt.point):fn;return Object.assign({},ap,{pt:Object.assign({},ap.pt,{point:v})});});},"edit-ag")}
                </div>
                <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
                  <select value={editAgPt.pt.priority} onChange={function(e){var v=e.target.value;setEditAgPt(function(ap){return Object.assign({},ap,{pt:Object.assign({},ap.pt,{priority:v})});});}} style={selSt({width:"auto",minWidth:90,fontSize:11})}>
                    {Object.keys(PRIS).map(function(k){return React.createElement("option",{key:k,value:k},PRIS[k].label);})}
                  </select>
                  <button onClick={function(){
                    var upd=editAgPt;
                    setAgenda(function(prev){var next=Object.assign({},prev);next[upd.mtId]=(prev[upd.mtId]||[]).map(function(p){return p.id===upd.pt.id?upd.pt:p;});return next;});
                    setEditAgPt(null);
                  }} style={{background:mt.color,color:"white",border:"none",borderRadius:6,padding:"6px 14px",fontSize:11,cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:700}}>Save</button>
                  <button onClick={function(){setEditAgPt(null);}} style={{background:"none",border:"1px solid "+th.border,borderRadius:6,padding:"6px 10px",fontSize:11,color:th.textMuted,cursor:"pointer",fontFamily:"inherit"}}>Cancel</button>
                </div>
              </div>
            )}

                  {/* Agenda points list */}
                  {activePts.length===0&&donePts.length===0&&(
                    <div style={card({textAlign:"center",padding:"40px 20px",color:th.textMuted})}>
                      <div style={{fontSize:28,marginBottom:8}}>📋</div>
                      <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700}}>No agenda points yet</div>
                      <div style={{fontSize:11,marginTop:4}}>Add points above, or use "Add to agenda" from the Email processor</div>
                    </div>
                  )}

                  {activePts.length>0&&(
                    <div style={card({marginBottom:10})}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                        <div style={{fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:700,color:th.textMuted,letterSpacing:"0.1em",textTransform:"uppercase"}}>{"Agenda ("+activePts.length+" items)"}</div>
                        <div style={{display:"flex",gap:5}}>
                          {["urgent","high","medium","low"].map(function(p){var count=activePts.filter(function(pt){return pt.priority===p;}).length;if(!count)return null;return(<span key={p} style={badge(PRI_COLORS[p]+"18",PRI_COLORS[p],PRI_COLORS[p]+"33")}>{count+" "+p}</span>);})}
                        </div>
                      </div>
                      {activePts.map(function(pt,i){
                        var sourceCol={manual:th.textMuted,email:"#0EA5E9",task:"#10B981"}[pt.source]||th.textMuted;
                        return(
                          <div key={pt.id} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 0",borderTop:i>0?"1px solid "+th.border:"none"}}>
                            <button onClick={function(){toggleAgendaPoint(mt.id,pt.id);}} style={{background:"none",border:"2px solid "+mt.color,borderRadius:"50%",width:18,height:18,minWidth:18,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:mt.color,fontSize:9,flexShrink:0,marginTop:2}}></button>
                            <div style={{flex:1,minWidth:0}}>
                              <div style={{fontSize:12,color:th.text,fontFamily:"'Syne',sans-serif",fontWeight:600,lineHeight:1.4,marginBottom:4}}>{pt.point}</div>
                              <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
                                <span style={badge(PRI_COLORS[pt.priority]+"18",PRI_COLORS[pt.priority],PRI_COLORS[pt.priority]+"33")}>{pt.priority}</span>
                                <span style={{fontSize:9,color:sourceCol}}>{SOURCE_LABELS[pt.source]||pt.source}</span>
                                <span style={{fontSize:9,color:th.textMuted}}>{pt.addedDate}</span>
                              </div>
                            </div>
                            <button onClick={function(){setEditAgPt({mtId:mt.id,pt:Object.assign({},pt)});}} style={{background:"none",border:"none",color:th.accent,cursor:"pointer",fontSize:11,padding:0,flexShrink:0,lineHeight:1,marginRight:4}}>✏</button>
                            <button onClick={function(){removeAgendaPoint(mt.id,pt.id);}} style={{background:"none",border:"none",color:th.textMuted,cursor:"pointer",fontSize:13,padding:0,flexShrink:0,lineHeight:1}}>x</button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Done points */}
                  {donePts.length>0&&(
                    <div style={card({opacity:0.6})}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                        <div style={{fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:700,color:th.textMuted,letterSpacing:"0.1em",textTransform:"uppercase"}}>{"Covered ("+donePts.length+")"}</div>
                        <button onClick={function(){clearDonePoints(mt.id);}} style={{background:"none",border:"1px solid "+th.border,borderRadius:5,padding:"3px 10px",fontSize:10,color:th.textMuted,cursor:"pointer",fontFamily:"inherit"}}>Clear all</button>
                      </div>
                      {donePts.map(function(pt){return(
                        <div key={pt.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderTop:"1px solid "+th.border}}>
                          <button onClick={function(){toggleAgendaPoint(mt.id,pt.id);}} style={{background:mt.color,border:"none",borderRadius:"50%",width:16,height:16,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"white",fontSize:9,flexShrink:0}}>✓</button>
                          <div style={{fontSize:11,color:th.textMuted,textDecoration:"line-through",flex:1}}>{pt.point}</div>
                        </div>
                      );})}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* SETTINGS */}
        {appMode==="work"&&view==="settings"&&(
          <div className="fu">
            <div style={{marginBottom:16}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:th.textSub,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:2}}>Settings</div><div style={{fontSize:11,color:th.textMuted}}>Changes apply instantly across the whole app</div></div>

            {SetSection("appearance","Appearance","🎨",
              <div style={{paddingTop:12}}>
                <label style={lblSt()}>Theme</label>
                <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:12}}>
                  {Object.keys(THEMES).map(function(key){var t=THEMES[key];return(
                    <button key={key} onClick={function(){setSt("theme",key);}} style={{background:settings.theme===key?t.accent+"14":th.surface2,border:"2px solid "+(settings.theme===key?t.accent:th.border),borderRadius:10,padding:"10px 12px",cursor:"pointer",textAlign:"left",boxShadow:settings.theme===key?"0 2px 10px "+t.accent+"33":"none"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:settings.theme===key?t.accent:th.text}}>{t.icon+" "+t.name}</div>{settings.theme===key&&<span style={{fontSize:10,color:t.accent,fontWeight:700}}>✓</span>}</div>
                      <div style={{fontSize:10,color:th.textMuted,marginBottom:5}}>{t.vibe}</div>
                      <div style={{display:"flex",gap:4}}>{[t.accent,t.green,t.amber,t.text].map(function(c,i){return <div key={i} style={{width:11,height:11,borderRadius:"50%",background:c,border:"1.5px solid "+th.border}}/>;})}</div>
                    </button>
                  );})}
                </div>
                <label style={lblSt()}>Default landing view</label>
                <select value={settings.defaultView} onChange={function(e){setSt("defaultView",e.target.value);}} style={selSt()}>
                  {NAV.filter(function(n){return n.id!=="settings";}).map(function(n){return <option key={n.id} value={n.id}>{n.label}</option>;})}
                </select>
              </div>
            )}

            {SetSection("profile","Your Profile","👤",
              <div style={{paddingTop:12}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <div style={{gridColumn:"span 2"}}><label style={lblSt()}>Your name (appears in letters and app header)</label><input type="text" value={settings.name} onChange={function(e){setSt("name",e.target.value);}} placeholder="e.g. Dr Sarah Jones" style={inpSt()}/></div>
                  <div style={{gridColumn:"span 2"}}><label style={lblSt()}>School name (auto-fills into generated documents)</label><input type="text" value={settings.school} onChange={function(e){setSt("school",e.target.value);}} placeholder="e.g. Greenfield Academy" style={inpSt()}/></div>
                  <div><label style={lblSt()}>Science specialism</label><select value={settings.specialism} onChange={function(e){setSt("specialism",e.target.value);}} style={selSt()}>{["General Science","Biology","Chemistry","Physics"].map(function(s){return <option key={s} value={s}>{s}</option>;})}</select></div>
                </div>
                {(settings.name||settings.school)&&<div style={{marginTop:10,background:th.greenBg,border:"1px solid "+th.green+"44",borderRadius:8,padding:"8px 12px",fontSize:11,color:th.green}}>Profile set - your name and school will appear in all generated documents.</div>}
              </div>
            )}

            {SetSection("working","Working Preferences","⏰",
              <div style={{paddingTop:12}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <div><label style={lblSt()}>Workday start</label><input type="time" value={settings.workStart} onChange={function(e){setSt("workStart",e.target.value);}} style={inpSt({colorScheme:"light"})}/></div>
                  <div><label style={lblSt()}>Workday end</label><input type="time" value={settings.workEnd} onChange={function(e){setSt("workEnd",e.target.value);}} style={inpSt({colorScheme:"light"})}/></div>
                  <div><label style={lblSt()}>Focus session (mins)</label><select value={settings.pomoWork} onChange={function(e){setSt("pomoWork",parseInt(e.target.value));}} style={selSt()}>{[15,20,25,30,45,50].map(function(n){return <option key={n} value={n}>{n+" minutes"}</option>;})}</select></div>
                  <div><label style={lblSt()}>Short break (mins)</label><select value={settings.pomoBreak} onChange={function(e){setSt("pomoBreak",parseInt(e.target.value));}} style={selSt()}>{[5,10,15].map(function(n){return <option key={n} value={n}>{n+" minutes"}</option>;})}</select></div>
                  <div style={{gridColumn:"span 2"}}><label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}><input type="checkbox" checked={settings.weekendProtection} onChange={function(e){setSt("weekendProtection",e.target.checked);}} style={{accentColor:th.accent,width:16,height:16}}/><span style={{fontSize:12,color:th.text}}>Flag weekend working hours in Wellbeing tracker</span></label></div>
                </div>
              </div>
            )}

            {SetSection("calendar","School Calendar","📅",
              <div style={{paddingTop:12}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <div style={{gridColumn:"span 2"}}><label style={lblSt()}>Current term name</label><input type="text" value={settings.termName} onChange={function(e){setSt("termName",e.target.value);}} placeholder="e.g. Summer Term 2026" style={inpSt()}/></div>
                  <div><label style={lblSt()}>Half term date</label><input type="date" value={settings.halfTerm} onChange={function(e){setSt("halfTerm",e.target.value);}} style={inpSt({colorScheme:"light"})}/></div>
                  <div><label style={lblSt()}>Exam season start</label><input type="date" value={settings.examStart} onChange={function(e){setSt("examStart",e.target.value);}} style={inpSt({colorScheme:"light"})}/></div>
                </div>
                <div style={{marginTop:8,fontSize:11,color:th.textMuted}}>Half-term warnings appear in Focus view when within 5 days.</div>
              </div>
            )}

            {SetSection("taskDefaults","Task Defaults","✅",
              <div style={{paddingTop:12}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <div><label style={lblSt()}>Default priority</label><select value={settings.defaultPriority} onChange={function(e){setSt("defaultPriority",e.target.value);}} style={selSt()}>{Object.keys(PRIS).map(function(k){return <option key={k} value={k}>{PRIS[k].label}</option>;})}</select></div>
                  <div><label style={lblSt()}>Default category</label><select value={settings.defaultCategory} onChange={function(e){setSt("defaultCategory",e.target.value);}} style={selSt()}>{Object.keys(CATS).map(function(k){return <option key={k} value={k}>{CATS[k].icon+" "+CATS[k].label}</option>;})}</select></div>
                  <div><label style={lblSt()}>Default time estimate</label><select value={settings.defaultMins} onChange={function(e){setSt("defaultMins",parseInt(e.target.value));}} style={selSt()}>{[15,20,30,45,60,90,120].map(function(n){return <option key={n} value={n}>{n+" mins"}</option>;})}</select></div>
                </div>
                <div style={{marginTop:8,fontSize:11,color:th.textMuted}}>These values pre-fill every new task and brain dump conversion.</div>
              </div>
            )}

            {SetSection("gcal","Google Calendar","📅",
            <div style={{paddingTop:12}}>
              <div style={{fontSize:11,color:th.textMuted,marginBottom:10,lineHeight:1.7}}>Paste your Google Calendar private iCal URL to sync events into the shared calendar view. Find it in Google Calendar settings under your calendar name.</div>
              <label style={lblSt()}>iCal URL</label>
              <div style={{display:"flex",gap:6,marginBottom:10}}>
                <input type="text" value={settings.gcalUrl||""} onChange={function(e){var v=e.target.value;setSettings(function(s){return Object.assign({},s,{gcalUrl:v});});}} placeholder="https://calendar.google.com/calendar/ical/..." style={inpSt({flex:1,fontSize:11})}/>
                <button onClick={fetchGoogleCalendar} disabled={gcalLoading||!settings.gcalUrl} style={{background:settings.gcalUrl&&!gcalLoading?th.accent:th.surface2,color:settings.gcalUrl&&!gcalLoading?th.accentText:th.textMuted,border:"none",borderRadius:7,padding:"0 14px",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:11,cursor:settings.gcalUrl&&!gcalLoading?"pointer":"default",whiteSpace:"nowrap"}}>{gcalLoading?"Loading...":"Sync now"}</button>
              </div>
              {gcalErr&&<div style={{fontSize:11,color:th.red,marginBottom:6,padding:"6px 10px",background:th.redBg,borderRadius:6}}>{gcalErr}</div>}
              {gcalEvents.length>0&&<div style={{fontSize:11,color:th.green,marginBottom:8,padding:"6px 10px",background:th.greenBg,borderRadius:6}}>{"✓ "+gcalEvents.length+" events loaded from Google Calendar"}</div>}
              <div style={{background:th.amberBg,border:"1px solid "+th.amber+"44",borderRadius:8,padding:"10px 12px",fontSize:11,color:th.textSub,lineHeight:1.7}}>
                <div style={{fontWeight:700,marginBottom:4}}>How to get your URL:</div>
                <div>1. Open calendar.google.com on your laptop</div>
                <div>2. Click the ⚙ gear → Settings</div>
                <div>3. Click your calendar name on the left</div>
                <div>4. Scroll to "Secret address in iCal format"</div>
                <div>5. Copy and paste the URL above</div>
              </div>
            </div>
          )}
                    {SetSection("data","Data & Reset","📦",
              <div style={{paddingTop:12,display:"flex",flexDirection:"column",gap:8}}>
                {[
                  {label:"Clear all completed tasks",sub:tasks.filter(function(t){return t.done;}).length+" completed tasks",action:function(){setTasks(function(ts){return ts.filter(function(t){return !t.done;});});},col:th.amber,bg:th.amberBg},
                  {label:"Reset wellbeing week",sub:"Clear this weeks hours and mood",action:function(){setWb(INIT_WB);},col:th.amber,bg:th.amberBg},
                  {label:"Reset all settings",sub:"Restore all settings to defaults",action:function(){setSettings(INIT_SETTINGS);},col:th.red,bg:th.redBg},
                ].map(function(item,i){return(
                  <div key={i} style={{background:th.surface2,border:"1px solid "+th.border,borderRadius:8,padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                    <div><div style={{fontSize:12,color:th.text,fontWeight:600,fontFamily:"'Syne',sans-serif"}}>{item.label}</div><div style={{fontSize:10,color:th.textMuted,marginTop:2}}>{item.sub}</div></div>
                    <button onClick={item.action} style={{background:item.bg,color:item.col,border:"1px solid "+item.col+"44",borderRadius:6,padding:"6px 14px",fontSize:11,cursor:"pointer",fontFamily:"inherit",fontWeight:600,whiteSpace:"nowrap"}}>{item.label.split(" ").slice(0,2).join(" ")}</button>
                  </div>
                );})}
                <div style={card({background:th.surface2})}>
                  <div style={{fontSize:12,color:th.text,fontWeight:600,fontFamily:"'Syne',sans-serif",marginBottom:3}}>Export task list</div>
                  <div style={{fontSize:10,color:th.textMuted,marginBottom:8}}>{pending.length+" pending tasks"}</div>
                  <button onClick={function(){var txt=pending.map(function(t){return "["+t.priority.toUpperCase()+"] "+t.title+" - due "+t.dueDate+" (~"+t.estimatedMins+"m)"+(t.notes?"\n  "+t.notes:"");}).join("\n");navigator.clipboard.writeText(txt);}} style={{background:th.accent,color:th.accentText,border:"none",borderRadius:6,padding:"7px 16px",fontSize:11,cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:700}}>Copy task list to clipboard</button>
                </div>
              </div>
            )}

            <div style={{marginTop:8,fontSize:11,color:th.textMuted,textAlign:"center"}}>All settings stored locally in this session. Changes take effect immediately.</div>
          </div>
        )}

      </div>
    </div>
  );
}
