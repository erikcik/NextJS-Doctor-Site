Below is an expanded **Project Requirements Document (PRD)** that captures all necessary details to guide developers. It consolidates your original requirements, plus clarifying details about file structure, data modeling, form flows, and example requests/responses. **No actual production code** is included—only guidelines and examples.

---

## 1. Project Overview

We are extending an existing Next.js (version **15.1**) application by adding four new entry types to its content management flow:

1. **Blog**  
2. **Complementary Medicine**  
3. **Orthopedics**  
4. **Announcement**

Each entry type has specific fields. All entries will use a Markdown-based editor (powered by **Slate.js**) for text content. We will also incorporate:

- **Drizzle ORM** for database operations.  
- **shadcn** (component library) + **Tailwind CSS** for UI.  
- **Lucide Icons** and **Aceternity UI** for additional UI components.  
- **Skeleton** components (from shadcn) to provide loading states.

### 1.1. Goals

1. **Admin Experience**  
   - Admins can create, edit, and delete any of the four entry types.  
   - On the Admin Dashboard, selecting “Create Entry” triggers a modal asking which entry type (Blog, Complementary Medicine, Orthopedics, Announcement).  
   - After selecting the type, the admin is taken to an entry-specific creation form.  
   - Each entry type has distinct fields.  
   - The Markdown editor is used for bilingual text entries (Turkish/English).

2. **Homepage + Showcase**  
   - The homepage showcases:  
     - Up to **3 orthopedics entries** (using `OrthopedicsShow` component).  
     - The most recent (or selected) **blog entries** (using `BlogSection` component).  
     - **TestimonialsAnnouncements** for announcements or testimonials.  
     - A custom structure for displaying announcements.  
   - Dedicated pages for each type:
     - **/blog** displays all blog entries.  
     - **/complementary-medicine** displays complementary medicine entries.  
     - **/orthopedics** displays orthopedics entries.  
     - **/announcements** (or a similar route) displays announcements.

### 1.2. Tech Stack

- **Next.js** 15.1  
- **Drizzle ORM** for database  
- **shadcn** + **Tailwind CSS** for UI and styling  
- **Slate.js** for Markdown editor  
- **Lucide Icons & Aceternity UI** for icons and additional UI components

---

## 2. Data Model & Schema

All four entry types will be stored in the database via **Drizzle ORM**. We will keep the schema definitions in one file (`schema.ts`) for simplicity.

### 2.1. Entry Types & Fields

1. **Blog**  
   - `title` (string)  
   - `author` (string)  
   - `coverImage` (string: URL or path)  
   - `linkToBook` (string: optional)  
   - `minutesToRead` (number: optional)  
   - `turkishContent` (text: markdown)  
   - `englishContent` (text: markdown)

2. **Complementary Medicine**  
   - `title` (string)  
   - `author` (string)  
   - `coverImage` (string: URL or path)  
   - `turkishContent` (text: markdown)  
   - `englishContent` (text: markdown)

3. **Orthopedics**  
   - `title` (string)  
   - `author` (string)  
   - `coverImage` (string: URL or path)  
   - `turkishContent` (text: markdown)  
   - `englishContent` (text: markdown)

4. **Announcement**  
   - `title` (string)  
   - `turkishContent` (text: markdown)  
   - `englishContent` (text: markdown)

> **Note**: The actual naming in the Drizzle schema can vary (e.g., `BlogTable`, `ComplementaryMedicineTable`, etc.) but the above fields must be present.

---

## 3. User Flows

### 3.1. Admin Creation Flow

1. **Open Admin Dashboard**  
2. **Click “Create Entry”**  
   - A modal appears allowing the admin to pick one of the four types.  
3. **Select Desired Entry Type**  
   - The admin is navigated to a route like:  
     ```
     /admin/entries/new?type=blog
     ```
     or  
     ```
     /admin/entries/new?type=announcement
     ```
4. **Fill Out Fields**  
   - A single form (component `admin-entry-form.tsx`) conditionally renders fields:
     - If `type=blog`, show `linkToBook`, `coverImage`, `minutesToRead` fields, etc.  
     - If `type=announcement`, do not show fields like `coverImage` or `author`.  
5. **Use Markdown Editor** for Turkish and English content.  
6. **Submit**  
   - A POST request is sent to `/api/entries` with payload:
     ```json
     {
       "type": "blog",
       "title": "Example Blog Title",
       "author": "John Doe",
       "coverImage": "https://example.com/image.jpg",
       "linkToBook": "https://example.com/book",
       "minutesToRead": 5,
       "turkishContent": "## Türkçe İçerik",
       "englishContent": "## English Content"
     }
     ```
   - **Response** example:
     ```json
     {
       "success": true,
       "data": {
         "id": "12345",
         "type": "blog",
         "title": "Example Blog Title",
         ...
       }
     }
     ```
7. **Admin sees confirmation** or error message if the request fails.

### 3.2. Admin Editing Flow

1. **Navigate to Admin Entries List**: e.g.  
   ```
   /admin/entries
   ```
   or a type-filtered list:
   ```
   /admin/entries?type=blog
   ```
2. **Click “Edit”** on a specific entry.  
3. **The page** (e.g. `admin/entries/[id]/edit`) fetches the entry from the database (or via an API call) to detect the `type` and populate fields.  
4. **Save** updates with a PATCH request to `/api/entries/[id]`.  
   - **Example body** (for a blog update):
     ```json
     {
       "title": "Updated Blog Title",
       "author": "Jane Doe",
       "minutesToRead": 6,
       "turkishContent": "## Updated Türkçe İçerik",
       "englishContent": "## Updated English Content"
     }
     ```
   - **Example response**:
     ```json
     {
       "success": true,
       "data": {
         "id": "12345",
         "type": "blog",
         "title": "Updated Blog Title",
         ...
       }
     }
     ```

### 3.3. Client (Public) View

1. **Homepage** (`[locale]/page.tsx`):
   - Show up to 3 orthopedics entries (`OrthopedicsShow` component).  
   - Show selected or most recent blog entries (`BlogSection` component).  
   - Show announcements (via a special block or `TestimonialsAnnouncements` component).  
2. **Dedicated Pages**:
   - **/blog**: Fetch and display all blog entries.  
   - **/complementary-medicine**: Fetch and display relevant entries.  
   - **/orthopedics**: Full list of orthopedics entries.  
   - **/announcements**: Full list of announcements.

---

## 4. High-Level File Structure

Below is a minimalistic structure designed to reduce file duplication, centralize logic, and keep the codebase tidy. We focus on the key directories and files relevant to these new features.
.
├── components.json
├── instructions.md
├── messages
│   ├── en.json
│   └── tr.json
├── next.config.js
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.js
├── prettier.config.js
├── public
│   └── favicon.ico
├── README.md
├── scripts
│   └── generate-password-hash.js
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── auth
│   │   │   ├── entries
│   │   │   │   └── route.ts         // Single route handling CRUD for all entry types
│   │   │   ├── translate
│   │   │   └── uploadthing
│   │   ├── layout.tsx
│   │   ├── [locale]
│   │   │   ├── about
│   │   │   ├── admin
│   │   │   │   ├
│   │   │   │   ├── page.tsx     // Admin list of entries (all or by type)
│   │   │   │   ├── new
│   │   │   │   │   └── page.tsx // "Create Entry" form (conditional fields by type)
│   │   │   │   │   
│   │   │   │   └── edit
│   │   │   │   │     └── [id]
                        └── page.tsx  // "Edit Entry" form (loads existing data)
│   │   │   ├── blog
│   │   │   │   └── page.tsx         // Displays blog entries
│   │   │   ├── complementary-medicine
│   │   │   │   └── page.tsx         // Displays complementary medicine entries
│   │   │   ├── _components
│   │   │   ├── contact
│   │   │   ├── layout.tsx
│   │   │   ├── loginSecurely
│   │   │   ├── orthopedics
│   │   │   │   └── page.tsx         // Displays orthopedics entries
│   │   │   ├── announcements
│   │   │   │   └── page.tsx         // Displays announcement entries
│   │   │   └── page.tsx             // Homepage (3 orthopedics, blog highlights, announcements)
│   │   └── not-found.tsx
│   ├── components
│   │   ├── about-section.tsx
│   │   ├── admin-entry-form.tsx     // Single form for creating/editing (conditional fields)
│   │   ├── blog-post.tsx
│   │   ├── blog-section.tsx
│   │   ├── carousel.tsx
│   │   ├── complementary-show.tsx
│   │   ├── contact-form.tsx
│   │   ├── contact-info.tsx
│   │   ├── delete-entry-button.tsx
│   │   ├── footer.tsx
│   │   ├── google-map.tsx
│   │   ├── hero.tsx
│   │   ├── markdown-display.tsx
│   │   ├── markdown-editor.tsx      // Slate.js-based editor for markdown
│   │   ├── navigation.tsx
│   │   ├── orthopedics-show.tsx
│   │   ├── resize-handle.tsx
│   │   ├── site-header.tsx
│   │   ├── testimonials-announcements.tsx
│   │   ├── treatment-card.tsx
│   │   └── ui
│   │       ├── 3d-card.tsx
│   │       ├── accordion.tsx
│   │       ├── avatar.tsx
│   │       ├── background-beams.tsx
│   │       ├── badge.tsx
│   │       ├── bento-grid.tsx
│   │       ├── button.tsx
│   │       ├── canvas-reveal-effect.tsx
│   │       ├── card-hover-effect.tsx
│   │       ├── card-spotlight.tsx
│   │       ├── card-stack.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── container-scroll-animation.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── glare-card.tsx
│   │       ├── glowing-stars.tsx
│   │       ├── infinite-moving-cards.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── layout-grid.tsx
│   │       ├── skeleton.tsx         // shadcn skeleton for loading states
│   │       ├── textarea.tsx
│   │       ├── text-reveal-card.tsx
│   │       ├── toaster.tsx
│   │       ├── toast.tsx
│   │       └── toolbar.tsx
│   ├── env.js
│   ├── hooks
│   │   └── use-toast.ts
│   ├── i18n
│   │   ├── request.ts
│   │   └── routing.ts
│   ├── lib
│   │   └── utils.ts
│   ├── middleware.ts
│   ├── server
│   │   ├── auth.ts
│   │   └── db
│   │       ├── index.ts
│   │       └── schema.ts            // All tables (blog, complementary, orthopedics, announcements)
│   ├── styles
│   │   └── globals.css
│   └── utils
│       ├── getCountryFromIP.ts
│       ├── translate.ts
│       └── uploadthing.ts
├── tailwind.config.ts
└── tsconfig.json

```

---

## 5. API Specifications & Examples

The core logic for creating, updating, and fetching entries is handled by a **single** route file:

```
/api/entries/route.ts
```

### 5.1. Create an Entry

- **Endpoint**: `POST /api/entries`  
- **Body Example**:
  ```json
  {
    "type": "blog",
    "title": "New Blog Title",
    "author": "John Smith",
    "coverImage": "https://example.com/cover.jpg",
    "linkToBook": "https://example.com/book",
    "minutesToRead": 5,
    "turkishContent": "# Türkçe Başlık",
    "englishContent": "# English Title"
  }
  ```
- **Sample Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "6376abcde",
      "type": "blog",
      "title": "New Blog Title",
      ...
    }
  }
  ```

### 5.2. Fetch Entries (by type)

- **Endpoint**: `GET /api/entries?type=blog`  
  - Returns all blog entries.  
- **Endpoint**: `GET /api/entries?type=orthopedics`  
  - Returns all orthopedics entries.  
- **Sample Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "12345",
        "title": "Orthopedic Article 1",
        "author": "Dr. Orth",
        ...
      },
      {
        "id": "67890",
        "title": "Orthopedic Article 2",
        "author": "Dr. Bones",
        ...
      }
    ]
  }
  ```

### 5.3. Update an Entry

- **Endpoint**: `PATCH /api/entries/:id`  
- **Body Example**:
  ```json
  {
    "title": "Updated Title",
    "author": "New Author",
    "turkishContent": "# Güncellenmiş İçerik"
  }
  ```
- **Sample Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "6376abcde",
      "type": "blog",
      "title": "Updated Title",
      ...
    }
  }
  ```

### 5.4. Delete an Entry

- **Endpoint**: `DELETE /api/entries/:id`
- **Sample Response**:
  ```json
  {
    "success": true
  }
  ```

---

## 6. UI Components & Implementation Notes

1. **Skeleton Loading State**  
   - Use `skeleton.tsx` from shadcn for any loading states on the admin pages and client-facing pages.  
   - Example usage (pseudo-code):
     ```tsx
     function BlogSection({ isLoading, data }) {
       if (isLoading) {
         return <Skeleton className="h-6 w-full" />
       }
       return <div>{/* Render blog data */}</div>
     }
     ```

2. **Markdown Editor** (`markdown-editor.tsx`)  
   - Single component for Slate.js-based editor. Accepts `initialContent` and returns updated content on change.  
   - Used in forms for `turkishContent` and `englishContent`.

3. **Conditional Form Fields** (`admin-entry-form.tsx`)  
   - Checks `type` prop (blog, complementary, orthopedics, announcement).  
   - Renders relevant fields only.

4. **Navigation & Modal**  
   - On the Admin Dashboard, the “Create Entry” button opens a modal with quick links:  
     - “Create Blog Entry” → `/admin/entries/new?type=blog`  
     - “Create Complementary Medicine” → `/admin/entries/new?type=complementary`  
     - “Create Orthopedics” → `/admin/entries/new?type=orthopedics`  
     - “Create Announcement” → `/admin/entries/new?type=announcement`

---

## 7. Testing & Validation

1. **Unit Tests**  
   - Validate schema-level constraints (title must be required, etc.).  
   - Test the single `/api/entries/route.ts` for all CRUD operations.  
2. **Integration Tests**  
   - Ensure admin can create an entry and see it listed on the relevant public page.  
   - Check the homepage loads 3 orthopedics entries, plus blog posts and announcements.

---

## 8. Timeline & Milestones

1. **Phase 1**: Database schema updates + Single API route for CRUD.  
2. **Phase 2**: Admin UI updates (conditional form + listing).  
3. **Phase 3**: Front-end pages for each entry type + homepage integration.  
4. **Phase 4**: QA, bug fixes, final review.

---

## 9. Summary

This PRD details the **new entry types** (blog, complementary medicine, orthopedics, announcement), their **fields**, the **admin flows** for creating/editing, and the **public-facing** display. By following the single-route pattern (`/api/entries`) and a **lean file structure**, duplication is minimized. All references to code snippets and responses are **examples** only, designed to clarify how the final implementation might look.

> **Note**: The actual code for controllers, database queries, and UI components will be implemented per your development standards. This document serves as the blueprint, ensuring alignment across the team.

---

**End of PRD**