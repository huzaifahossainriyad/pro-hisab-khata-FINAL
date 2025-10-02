-- FINAL CONSOLIDATED SCHEMA (idempotent)
create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  address text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid()
);

create table if not exists public.settings (
  owner uuid primary key,
  currency text default 'BDT',
  theme text default 'theme-blue',
  color_mode text default 'light',
  config jsonb default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.clients add column if not exists owner uuid not null default auth.uid();
alter table public.transactions add column if not exists owner uuid not null default auth.uid();
alter table public.transactions add column if not exists client_id uuid;
alter table public.transactions add column if not exists type text;
alter table public.transactions add column if not exists amount numeric(12,2) not null default 0;
alter table public.transactions add column if not exists note text;
alter table public.transactions add column if not exists date timestamptz not null default now();
alter table public.settings add column if not exists owner uuid;

do $$ begin
  if not exists (select 1 from pg_constraint where conname='transactions_type_check') then
    alter table public.transactions add constraint transactions_type_check check (type in ('credit','debit'));
  end if;
end$$;

do $$ begin
  if not exists (select 1 from pg_constraint where conname='transactions_client_fk') then
    alter table public.transactions add constraint transactions_client_fk
      foreign key (client_id) references public.clients(id) on delete cascade;
  end if;
end$$;

create index if not exists idx_clients_owner on public.clients(owner);
create index if not exists idx_tx_owner_clientdate on public.transactions(owner, client_id, date desc);
create index if not exists idx_tx_type on public.transactions(type);

alter table public.clients enable row level security;
alter table public.transactions enable row level security;
alter table public.settings enable row level security;

drop policy if exists "clients owner read"   on public.clients;
drop policy if exists "clients owner write"  on public.clients;
drop policy if exists "clients owner update" on public.clients;
drop policy if exists "clients owner delete" on public.clients;

create policy "clients owner read"   on public.clients for select using (owner = auth.uid());
create policy "clients owner write"  on public.clients for insert with check (owner = auth.uid());
create policy "clients owner update" on public.clients for update using (owner = auth.uid());
create policy "clients owner delete" on public.clients for delete using (owner = auth.uid());

drop policy if exists "transactions owner read"   on public.transactions;
drop policy if exists "transactions owner write"  on public.transactions;
drop policy if exists "transactions owner update" on public.transactions;
drop policy if exists "transactions owner delete" on public.transactions;

create policy "transactions owner read"   on public.transactions for select using (owner = auth.uid());
create policy "transactions owner write"  on public.transactions for insert with check (owner = auth.uid());
create policy "transactions owner update" on public.transactions for update using (owner = auth.uid());
create policy "transactions owner delete" on public.transactions for delete using (owner = auth.uid());

drop policy if exists "settings owner read"   on public.settings;
drop policy if exists "settings owner upsert" on public.settings;
drop policy if exists "settings owner update" on public.settings;

create policy "settings owner read"   on public.settings for select using (owner = auth.uid());
create policy "settings owner upsert" on public.settings for insert with check (owner = auth.uid());
create policy "settings owner update" on public.settings for update using (owner = auth.uid());

create or replace view public.client_balances as
select c.id as client_id,
       c.name as name,
       coalesce(sum(case when t.type='credit' then t.amount when t.type='debit' then -t.amount else 0 end),0) as balance
from public.clients c
left join public.transactions t on t.client_id = c.id and t.owner = c.owner
group by c.id, c.name;
