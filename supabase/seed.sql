-- Optional starter content for ArabDEV. Safe to run more than once.
insert into public.themes (title,slug,label,category,description,price,features,keywords,status)
values
('GulfShop','gulfshop','متجر خليجي','متاجر إلكترونية','ثيم WooCommerce عربي سريع ومصمم من البداية لتجربة شراء خليجية ممتازة.','199 ر.س',array['RTL / LTR','WooCommerce','Mobile First','WhatsApp CTA','SEO Ready'],array['قالب متجر سعودي','woocommerce عربي'],'published'),
('Khidma','khidma','خدمات وصيانة','شركات الخدمات','قالب احترافي لشركات التكييف والصيانة والنظافة والكهرباء والسباكة.','199 ر.س',array['صفحات خدمات','مناطق التغطية','CTA واتساب','Local SEO'],array['قالب شركة صيانة','موقع خدمات سعودي'],'published')
on conflict (slug) do nothing;

insert into public.plugins (title,slug,label,category,description,price,features,keywords,status)
values
('WhatsApp Pulse','whatsapp-pulse','زر واتساب احترافي','Conversion','زر واتساب مرن بحركات Pulse وتحكم في الظهور حسب الشاشة.','قريباً',array['Responsive Visibility','Pulse Controls','Lightweight CSS'],array['إضافة واتساب ووردبريس'],'published'),
('Gulf Commerce UX','gulf-commerce-ux','تحسين تجربة WooCommerce','WooCommerce','تحسينات UX عملية للمتاجر العربية والخليجية.','قريباً',array['Sticky Cart','Mobile Purchase Bar','RTL Native'],array['إضافة ووكومرس عربي'],'published')
on conflict (slug) do nothing;

insert into public.articles (title,slug,excerpt,content_html,category,seo_title,seo_description,keywords,status,published_at)
values
('كيف تختار قالب ووردبريس مناسب لمتجر سعودي؟','best-wordpress-theme-saudi-store','اختيار القالب لا يتوقف على الشكل؛ السرعة، تجربة الموبايل والعربية أهم من كثرة المؤثرات.','<h2>ابدأ من تجربة الموبايل</h2><p>صفحة المنتج والسلة والتنقل لازم تكون واضحة وسريعة قبل التفكير في المؤثرات البصرية.</p><h2>العربية ليست مجرد RTL</h2><p>القالب العربي الجيد يهتم بالخطوط والمسافات واتجاه الأيقونات وترتيب عناصر الشراء.</p>','WordPress','كيف تختار قالب ووردبريس لمتجر سعودي؟','دليل عملي لاختيار قالب WordPress عربي مناسب للمتاجر السعودية والخليجية.',array['قالب ووردبريس متجر سعودي','WooCommerce السعودية'],'published',now()),
('Elementor أم قالب WordPress مبرمج؟','elementor-vs-coded-wordpress-theme','مقارنة عملية بين سهولة Elementor والأداء والمرونة في القوالب المبرمجة.','<h2>متى تختار Elementor؟</h2><p>عندما يحتاج صاحب الموقع إلى تعديل بصري سهل بدون مطور.</p><h2>متى تختار القالب المبرمج؟</h2><p>عندما تكون الأولوية للأداء والتحكم الكامل.</p>','Elementor','Elementor أم قالب WordPress مبرمج؟','مقارنة عربية بين Elementor والقوالب المبرمجة لمساعدتك في اختيار الأنسب.',array['Elementor عربي','قالب ووردبريس مبرمج'],'published',now() - interval '1 day')
on conflict (slug) do nothing;
