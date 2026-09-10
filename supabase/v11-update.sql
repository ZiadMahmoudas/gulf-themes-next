-- ArabDEV V11 — FAQ CMS update
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.faqs enable row level security;

drop policy if exists "public read faqs" on public.faqs;
create policy "public read faqs" on public.faqs for select to anon, authenticated
using (is_published = true or (select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');

drop policy if exists "admin insert faqs" on public.faqs;
create policy "admin insert faqs" on public.faqs for insert to authenticated
with check ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');

drop policy if exists "admin update faqs" on public.faqs;
create policy "admin update faqs" on public.faqs for update to authenticated
using ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com')
with check ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');

drop policy if exists "admin delete faqs" on public.faqs;
create policy "admin delete faqs" on public.faqs for delete to authenticated
using ((select auth.jwt()->>'email') = 'ziadbobo78@gmail.com');

drop trigger if exists faqs_updated_at on public.faqs;
create trigger faqs_updated_at before update on public.faqs
for each row execute function public.set_updated_at();

create index if not exists faqs_publish_order_idx on public.faqs(is_published, sort_order, created_at);

insert into public.faqs (question, answer, sort_order, is_published)
select * from (values
  ('ما الذي تقدمه ArabDEV بالضبط؟', 'نبني ونوفر قوالب WordPress وإضافات عملية ومواقع مخصصة موجهة للعربي من البداية، مع اهتمام واضح بالموبايل والأداء والـRTL وتجربة العميل.', 1, true),
  ('هل القوالب مناسبة للسعودية والإمارات والخليج؟', 'هذا هو الاتجاه الأساسي للمنصة. نهتم بطريقة عرض العربية، سرعة الموبايل، واتساب، WooCommerce، وصفحات الخدمات والمتاجر الشائعة في السوق الخليجي.', 2, true),
  ('هل أقدر أشاهد القالب أو الإضافة قبل التواصل؟', 'عند توفر نسخة Demo ستجد رابط المعاينة مباشرة على بطاقة المنتج. المنتجات الجديدة يمكن أن تظهر أولاً كقريباً حتى ننتهي من نسخة العرض.', 3, true),
  ('هل تنفذون تعديلات أو موقع مخصص؟', 'نعم. لو القالب الجاهز لا يغطي احتياج المشروع، تقدر تتواصل معنا لتنفيذ واجهة أو موقع أو وظيفة WordPress مخصصة.', 4, true)
) as seed(question, answer, sort_order, is_published)
where not exists (select 1 from public.faqs);
