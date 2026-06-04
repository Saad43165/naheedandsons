-- Database Schema Setup for Naheed & Sons
-- Copy and paste this script into your Supabase SQL Editor to initialize all tables.

-- Drop all old tables if they exist to build everything fresh
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

-- Insert default row if not exists
INSERT INTO public.rates (id, residential_rate, commercial_rate, interior_rate, renovation_rate, standard_multiplier, premium_multiplier, luxury_multiplier)
VALUES ('naheedandsons_rates_v1', 7500, 9500, 5000, 3800, 1.00, 1.30, 1.65)
ON CONFLICT (id) DO NOTHING;

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
  desc_text TEXT NOT NULL, -- renamed 'desc' to prevent SQL reserved word conflicts
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
  type TEXT NOT NULL, -- 'quote' or 'contact'
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

-- Row Level Security (RLS) policies configuration
ALTER TABLE public.rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 7. COMPANY SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.settings (
  id TEXT PRIMARY KEY DEFAULT 'naheedandsons_settings_v1',
  address TEXT NOT NULL DEFAULT 'Plot 45-C, Bukhari Commercial, DHA Phase 6, Karachi, Pakistan',
  phone TEXT NOT NULL DEFAULT '+92 (300) 123-4567',
  email TEXT NOT NULL DEFAULT 'info@naheedandsons.com',
  hours TEXT NOT NULL DEFAULT 'Mon - Sat: 9:00 AM - 6:00 PM',
  years_experience TEXT NOT NULL DEFAULT '25+',
  projects_completed TEXT NOT NULL DEFAULT '400+',
  client_satisfaction TEXT NOT NULL DEFAULT '100%',
  completed_on_time TEXT NOT NULL DEFAULT '98%',
  about_story_title TEXT NOT NULL DEFAULT 'Our Legacy',
  about_story_p1 TEXT NOT NULL DEFAULT 'Founded in 2001, Naheed & Sons Design & Construction Company started as a small contracting firm with a simple goal: to build homes that combine luxury with structural integrity. Over the last 25 years, we have grown into one of the region''s leading full-service construction firms.',
  about_story_p2 TEXT NOT NULL DEFAULT 'Today, we handle complex multi-story structures, high-end residential interiors, modern commercial designs, and structural renovations. Our success is built on long-term relationships, a highly qualified team, and our signature gold-standard client support.',
  about_story_image TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=2070&auto=format&fit=crop',
  about_mission TEXT NOT NULL DEFAULT 'To deliver unmatched construction quality and interior excellence through integrity, professional expertise, and innovation.',
  about_vision TEXT NOT NULL DEFAULT 'To lead the construction industry by building structures that inspire, stand the test of time, and enrich communities.',
  about_direction TEXT NOT NULL DEFAULT 'Guided by sustainable building practices, advanced engineering, and client-centric designs.',
  before_after_title TEXT NOT NULL DEFAULT 'Concrete Excellence',
  before_after_subtitle TEXT NOT NULL DEFAULT 'Interactive Transformation View',
  before_after_before_image TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
  before_after_after_image TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  before_after_before_label TEXT NOT NULL DEFAULT 'Concrete Frame Construction',
  before_after_after_label TEXT NOT NULL DEFAULT 'Completed Structural Handover',
  whatsapp_number TEXT NOT NULL DEFAULT '+92 (300) 123-4567',
  whatsapp_message TEXT NOT NULL DEFAULT 'Hello Naheed & Sons, I would like to inquire about your construction and design services.',
  facebook_link TEXT DEFAULT 'https://facebook.com',
  instagram_link TEXT DEFAULT 'https://instagram.com',
  linkedin_link TEXT DEFAULT 'https://linkedin.com',
  youtube_link TEXT DEFAULT 'https://youtube.com',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Insert default row if not exists
INSERT INTO public.settings (
  id, address, phone, email, hours, years_experience, projects_completed, client_satisfaction, completed_on_time,
  about_story_title, about_story_p1, about_story_p2, about_story_image, about_mission, about_vision, about_direction,
  before_after_title, before_after_subtitle, before_after_before_image, before_after_after_image, before_after_before_label, before_after_after_label,
  whatsapp_number, whatsapp_message, facebook_link, instagram_link, linkedin_link, youtube_link
)
VALUES (
  'naheedandsons_settings_v1', 
  'Plot 45-C, Bukhari Commercial, DHA Phase 6, Karachi, Pakistan', 
  '+92 (300) 123-4567', 
  'info@naheedandsons.com', 
  'Mon - Sat: 9:00 AM - 6:00 PM', 
  '25+', 
  '400+', 
  '100%', 
  '98%',
  'Our Legacy',
  'Founded in 2001, Naheed & Sons Design & Construction Company started as a small contracting firm with a simple goal: to build homes that combine luxury with structural integrity. Over the last 25 years, we have grown into one of the region''s leading full-service construction firms.',
  'Today, we handle complex multi-story structures, high-end residential interiors, modern commercial designs, and structural renovations. Our success is built on long-term relationships, a highly qualified team, and our signature gold-standard client support.',
  'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=2070&auto=format&fit=crop',
  'To deliver unmatched construction quality and interior excellence through integrity, professional expertise, and innovation.',
  'To lead the construction industry by building structures that inspire, stand the test of time, and enrich communities.',
  'Guided by sustainable building practices, advanced engineering, and client-centric designs.',
  'Concrete Excellence',
  'Interactive Transformation View',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'Concrete Frame Construction',
  'Completed Structural Handover',
  '+92 (300) 123-4567',
  'Hello Naheed & Sons, I would like to inquire about your construction and design services.',
  'https://facebook.com',
  'https://instagram.com',
  'https://linkedin.com',
  'https://youtube.com'
)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

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

INSERT INTO public.team_members (id, name, role, bio, image, sort_order, linkedin, email, phone)
VALUES 
  ('member-1', 'John Miller', 'CEO & Founder', 'Over 25 years of construction management experience leading luxury residential and commercial builds.', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop', 1, 'https://linkedin.com', 'john@naheedandsons.com', '+92 (300) 123-4567'),
  ('member-2', 'Sarah Jenkins', 'Principal Architect', 'Expert designer focusing on sustainable, contemporary architecture and spatial dynamics.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop', 2, 'https://linkedin.com', 'sarah@naheedandsons.com', NULL),
  ('member-3', 'Marcus Brody', 'Chief Structural Engineer', 'Specializes in high-rise structural designs, complex concrete styling, and foundation stabilization.', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop', 3, 'https://linkedin.com', NULL, NULL),
  ('member-4', 'Elena Rostova', 'Head of Interior Design', 'Passionate about mixing natural elements with modern materials to create luxury, bespoke interiors.', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop', 4, NULL, 'elena@naheedandsons.com', NULL)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Anonymous public read policies
CREATE POLICY "Allow public read rates" ON public.rates FOR SELECT USING (true);
CREATE POLICY "Allow public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Allow public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow public read faqs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Allow public read settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Allow public read team_members" ON public.team_members FOR SELECT USING (true);

-- Anonymous insert inquiry policy (for client submissions)
CREATE POLICY "Allow public insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);

-- Service Role / Authenticated admin controls (All operations allowed for authenticated admins)
CREATE POLICY "Allow admin all rates" ON public.rates TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin all projects" ON public.projects TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin all blogs" ON public.blogs TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin all services" ON public.services TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin all faqs" ON public.faqs TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin all inquiries" ON public.inquiries TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin all settings" ON public.settings TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin all team_members" ON public.team_members TO authenticated USING (true) WITH CHECK (true);
