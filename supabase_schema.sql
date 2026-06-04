-- Database Schema Setup for Naheed & Sons
-- Clean, Production-Ready Schema (No Dummy Data, Unlocked for Admin Panel)

-- Drop all old tables to wipe out any ghost data
DROP TABLE IF EXISTS public.rates CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.blogs CASCADE;
DROP TABLE IF EXISTS public.services CASCADE;
DROP TABLE IF EXISTS public.faqs CASCADE;
DROP TABLE IF EXISTS public.inquiries CASCADE;
DROP TABLE IF EXISTS public.settings CASCADE;
DROP TABLE IF EXISTS public.team_members CASCADE;

-- 1. RATES / PRICE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.rates (
  id TEXT PRIMARY KEY DEFAULT 'naheedandsons_rates_v1',
  residential_rate INTEGER NOT NULL DEFAULT 7500,
  commercial_rate INTEGER NOT NULL DEFAULT 9500,
  interior_rate INTEGER NOT NULL DEFAULT 5000,
  renovation_rate INTEGER NOT NULL DEFAULT 3800,
  standard_multiplier NUMERIC(3,2) NOT NULL DEFAULT 1.00,
  premium_multiplier NUMERIC(3,2) NOT NULL DEFAULT 1.30,
  luxury_multiplier NUMERIC(3,2) NOT NULL DEFAULT 1.65,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  year TEXT NOT NULL,
  duration TEXT NOT NULL,
  area TEXT NOT NULL,
  budget TEXT NOT NULL,
  status TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  gallery TEXT[] NOT NULL DEFAULT '{}',
  tags TEXT[] NOT NULL DEFAULT '{}',
  team JSONB NOT NULL DEFAULT '[]'::jsonb,
  video TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. BLOG POSTS (ARTICLES) TABLE
CREATE TABLE IF NOT EXISTS public.blogs (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  author TEXT NOT NULL,
  image TEXT NOT NULL,
  content TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  desc_text TEXT NOT NULL, 
  image TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  suitable TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. FAQS TABLE
CREATE TABLE IF NOT EXISTS public.faqs (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL, 
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  project_type TEXT,
  area TEXT,
  budget TEXT,
  timeline TEXT,
  date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'New',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. COMPANY SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.settings (
  id TEXT PRIMARY KEY DEFAULT 'naheedandsons_settings_v1',
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  hours TEXT NOT NULL,
  years_experience TEXT NOT NULL,
  projects_completed TEXT NOT NULL,
  client_satisfaction TEXT NOT NULL,
  completed_on_time TEXT NOT NULL,
  about_story_title TEXT NOT NULL,
  about_story_p1 TEXT NOT NULL,
  about_story_p2 TEXT NOT NULL,
  about_story_image TEXT NOT NULL,
  about_mission TEXT NOT NULL,
  about_vision TEXT NOT NULL,
  about_direction TEXT NOT NULL,
  before_after_title TEXT NOT NULL,
  before_after_subtitle TEXT NOT NULL,
  before_after_before_image TEXT NOT NULL,
  before_after_after_image TEXT NOT NULL,
  before_after_before_label TEXT NOT NULL,
  before_after_after_label TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  whatsapp_message TEXT NOT NULL,
  facebook_link TEXT,
  tiktok_link TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 8. TEAM MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  image TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  linkedin TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  text TEXT NOT NULL,
  image TEXT,
  project TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ROW LEVEL SECURITY (RLS) ACTIVATION
ALTER TABLE public.rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- UNLOCKED POLICIES: ALLOWS THE ADMIN PANEL TO READ, WRITE, AND DELETE WITHOUT BLOCKS
DROP POLICY IF EXISTS "Allow all rates" ON public.rates;
CREATE POLICY "Allow all rates" ON public.rates FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all projects" ON public.projects;
CREATE POLICY "Allow all projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all blogs" ON public.blogs;
CREATE POLICY "Allow all blogs" ON public.blogs FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all services" ON public.services;
CREATE POLICY "Allow all services" ON public.services FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all faqs" ON public.faqs;
CREATE POLICY "Allow all faqs" ON public.faqs FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all settings" ON public.settings;
CREATE POLICY "Allow all settings" ON public.settings FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all team_members" ON public.team_members;
CREATE POLICY "Allow all team_members" ON public.team_members FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all testimonials" ON public.testimonials;
CREATE POLICY "Allow all testimonials" ON public.testimonials FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all inquiries" ON public.inquiries;
CREATE POLICY "Allow all inquiries" ON public.inquiries FOR ALL USING (true) WITH CHECK (true);
