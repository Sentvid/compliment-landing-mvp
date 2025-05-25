-- Compliment Landing Page MVP - Supabase Database Schema
-- Выполните этот SQL в Supabase SQL Editor

-- Таблица пользователей (расширение Supabase Auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  company TEXT,
  position TEXT,
  investor_type TEXT CHECK (investor_type IN ('vc', 'angel', 'corporate', 'other')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблица wishlist
CREATE TABLE wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблица NDA подписей
CREATE TABLE nda_signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  full_name TEXT NOT NULL,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  email TEXT NOT NULL,
  ip_address INET NOT NULL,
  user_agent TEXT,
  signature_text TEXT NOT NULL,
  signed_at TIMESTAMPTZ DEFAULT NOW(),
  nda_version TEXT DEFAULT 'v1.0'
);

-- Таблица feedback
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('question', 'idea', 'bug', 'partnership')),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived'))
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE nda_signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Политики безопасности
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can join wishlist" ON wishlist
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can sign NDA" ON nda_signatures
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own NDA" ON nda_signatures
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can submit feedback" ON feedback
  FOR INSERT WITH CHECK (true);

-- Создание функции для автоматического создания профиля
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', '')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Триггер для автоматического создания профиля при регистрации
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
