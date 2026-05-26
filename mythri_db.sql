--
-- PostgreSQL database dump
--

\restrict KgmMA601B7yWOKavCoHqtgYdI0uAyyrA0IcpppUQBP2mPa0qClNlaW6za3uzfsA

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-05-18 11:28:58

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5045 (class 1262 OID 16692)
-- Name: mytri; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE mytri WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';


ALTER DATABASE mytri OWNER TO postgres;

\unrestrict KgmMA601B7yWOKavCoHqtgYdI0uAyyrA0IcpppUQBP2mPa0qClNlaW6za3uzfsA
\connect mytri
\restrict KgmMA601B7yWOKavCoHqtgYdI0uAyyrA0IcpppUQBP2mPa0qClNlaW6za3uzfsA

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16739)
-- Name: dashboard_reports; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.dashboard_reports (
    id bigint NOT NULL,
    officer_mobile character varying(10) NOT NULL,
    report_date date NOT NULL,
    champion_attended character varying(3) NOT NULL,
    total_ops integer DEFAULT 0,
    submitted_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.dashboard_reports OWNER TO root;

--
-- TOC entry 221 (class 1259 OID 16738)
-- Name: dashboard_reports_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.dashboard_reports_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dashboard_reports_id_seq OWNER TO root;

--
-- TOC entry 5047 (class 0 OID 0)
-- Dependencies: 221
-- Name: dashboard_reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.dashboard_reports_id_seq OWNED BY public.dashboard_reports.id;


--
-- TOC entry 220 (class 1259 OID 16720)
-- Name: officer_registration; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.officer_registration (
    id bigint NOT NULL,
    district character varying(100) NOT NULL,
    mandal character varying(100) NOT NULL,
    hospital_name character varying(200) NOT NULL,
    username character varying(150) NOT NULL,
    mobile character varying(10) NOT NULL,
    password text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.officer_registration OWNER TO root;

--
-- TOC entry 219 (class 1259 OID 16719)
-- Name: officer_registration_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.officer_registration_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.officer_registration_id_seq OWNER TO root;

--
-- TOC entry 5048 (class 0 OID 0)
-- Dependencies: 219
-- Name: officer_registration_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.officer_registration_id_seq OWNED BY public.officer_registration.id;


--
-- TOC entry 224 (class 1259 OID 16759)
-- Name: state_admin_users; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.state_admin_users (
    id bigint NOT NULL,
    username character varying(100) NOT NULL,
    password_hash text NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    last_login_at timestamp with time zone
);


ALTER TABLE public.state_admin_users OWNER TO root;

--
-- TOC entry 223 (class 1259 OID 16758)
-- Name: state_admin_users_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.state_admin_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.state_admin_users_id_seq OWNER TO root;

--
-- TOC entry 5049 (class 0 OID 0)
-- Dependencies: 223
-- Name: state_admin_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.state_admin_users_id_seq OWNED BY public.state_admin_users.id;


--
-- TOC entry 4869 (class 2604 OID 16742)
-- Name: dashboard_reports id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.dashboard_reports ALTER COLUMN id SET DEFAULT nextval('public.dashboard_reports_id_seq'::regclass);


--
-- TOC entry 4867 (class 2604 OID 16723)
-- Name: officer_registration id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.officer_registration ALTER COLUMN id SET DEFAULT nextval('public.officer_registration_id_seq'::regclass);


--
-- TOC entry 4872 (class 2604 OID 16762)
-- Name: state_admin_users id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.state_admin_users ALTER COLUMN id SET DEFAULT nextval('public.state_admin_users_id_seq'::regclass);


--
-- TOC entry 5037 (class 0 OID 16739)
-- Dependencies: 222
-- Data for Name: dashboard_reports; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- TOC entry 5035 (class 0 OID 16720)
-- Dependencies: 220
-- Data for Name: officer_registration; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.officer_registration VALUES (1, 'warangal', 'konraopeta', 'test', 'test', '7894561230', '$2y$10$MLGDO.a4jg63RICGKOkHF.fc4YETOzz3U9mKHRk1oB0/7R6IfgOh6', '2026-05-05 15:39:38.634618+05:30');


--
-- TOC entry 5039 (class 0 OID 16759)
-- Dependencies: 224
-- Data for Name: state_admin_users; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.state_admin_users VALUES (1, 'admin', '$2y$10$i2V77/inSfOlMbwoxz3wRuiNahzKS5.KHZ9X9nQ8OIeg5TmTBECtC', true, '2026-05-05 16:07:20.026869+05:30', '2026-05-05 16:14:28.446602+05:30', '2026-05-05 16:14:28.446602+05:30');


--
-- TOC entry 5050 (class 0 OID 0)
-- Dependencies: 221
-- Name: dashboard_reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.dashboard_reports_id_seq', 1, false);


--
-- TOC entry 5051 (class 0 OID 0)
-- Dependencies: 219
-- Name: officer_registration_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.officer_registration_id_seq', 1, true);


--
-- TOC entry 5052 (class 0 OID 0)
-- Dependencies: 223
-- Name: state_admin_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.state_admin_users_id_seq', 1, true);


--
-- TOC entry 4881 (class 2606 OID 16750)
-- Name: dashboard_reports dashboard_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.dashboard_reports
    ADD CONSTRAINT dashboard_reports_pkey PRIMARY KEY (id);


--
-- TOC entry 4877 (class 2606 OID 16737)
-- Name: officer_registration officer_registration_mobile_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.officer_registration
    ADD CONSTRAINT officer_registration_mobile_key UNIQUE (mobile);


--
-- TOC entry 4879 (class 2606 OID 16735)
-- Name: officer_registration officer_registration_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.officer_registration
    ADD CONSTRAINT officer_registration_pkey PRIMARY KEY (id);


--
-- TOC entry 4883 (class 2606 OID 16775)
-- Name: state_admin_users state_admin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.state_admin_users
    ADD CONSTRAINT state_admin_users_pkey PRIMARY KEY (id);


--
-- TOC entry 4885 (class 2606 OID 16777)
-- Name: state_admin_users state_admin_users_username_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.state_admin_users
    ADD CONSTRAINT state_admin_users_username_key UNIQUE (username);


--
-- TOC entry 4886 (class 2606 OID 16751)
-- Name: dashboard_reports fk_officer_mobile; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.dashboard_reports
    ADD CONSTRAINT fk_officer_mobile FOREIGN KEY (officer_mobile) REFERENCES public.officer_registration(mobile);


--
-- TOC entry 5046 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO root;


--
-- TOC entry 2062 (class 826 OID 16757)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO root;


-- Completed on 2026-05-18 11:28:58

--
-- PostgreSQL database dump complete
--

\unrestrict KgmMA601B7yWOKavCoHqtgYdI0uAyyrA0IcpppUQBP2mPa0qClNlaW6za3uzfsA

