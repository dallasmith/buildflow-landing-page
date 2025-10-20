# 🛡️ Content Safeguards for BuildFlow Landing Page

## Overview

This repository implements **multiple layers of protection** to prevent accidental copy changes to the landing page content. All user-visible text is managed through a single source of truth with automated testing and linting.

## 🚨 **SAFEGUARD LAYERS**

### 1. **Snapshot Testing** (Primary Protection)
- **File**: `tests/landingCopy.test.ts`
- **Purpose**: Captures EXACT current copy as a baseline
- **Behavior**: Test fails if ANY text changes, highlighting exact differences
- **Command**: `npm run test`

### 2. **ESLint Rules** (Development Protection)
- **File**: `.eslintrc.js`
- **Purpose**: Warns against inline string literals in components
- **Behavior**: Shows warnings/errors for new inline text
- **Command**: `npm run lint`

### 3. **Content Management System** (Structural Protection)
- **File**: `content/landingCopy.js`
- **Purpose**: Single source of truth for all copy
- **Behavior**: All components must import from this file

## 📋 **HOW TO UPDATE COPY (APPROVED CHANGES ONLY)**

### **Step 1: Get Business Approval**
- ✅ **REQUIRED**: Explicit approval from business owner
- ✅ **REQUIRED**: Document the reason for change
- ❌ **FORBIDDEN**: Making changes without approval

### **Step 2: Update Content**
```bash
# Edit the content file
code content/landingCopy.js

# Make ONLY the approved changes
# Preserve exact punctuation, spacing, formatting
```

### **Step 3: Update Snapshot**
```bash
# Update the test snapshot with new content
npm run test -- --update-snapshots

# Verify the snapshot shows your changes
npm run test
```

### **Step 4: Commit Changes**
```bash
# Commit BOTH content AND updated snapshot
git add content/landingCopy.js tests/__snapshots__/
git commit -m "feat: update copy with business approval - [describe change]"
git push
```

## 🧪 **TESTING THE SAFEGUARDS**

### **Run All Tests**
```bash
npm run test
```

### **Run Tests in Watch Mode**
```bash
npm run test:watch
```

### **Check Linting**
```bash
npm run lint
```

### **Fix Linting Issues**
```bash
npm run lint:fix
```

## 🚫 **WHAT TRIGGERS SAFEGUARDS**

### **Snapshot Test Failure**
- Any text change in `landingCopy.js`
- Added/removed content sections
- Changed punctuation or spacing
- Modified formatting

### **ESLint Warnings/Errors**
- New inline string literals in components
- Hardcoded text in JSX
- Missing imports from `landingCopy.js`

## 📁 **FILE STRUCTURE**

```
├── content/
│   └── landingCopy.js          # 🎯 SINGLE SOURCE OF TRUTH
├── tests/
│   └── landingCopy.test.ts     # 🧪 Snapshot tests
├── components/                  # 🧩 React components
├── .eslintrc.js               # 🔍 Linting rules
├── vitest.config.ts           # ⚡ Test configuration
└── package.json               # 📦 Dependencies
```

## 🎯 **ACCEPTANCE CRITERIA**

- ✅ **Snapshot test passes** with current copy
- ✅ **ESLint shows no warnings** for inline literals
- ✅ **All components import** from `landingCopy.js`
- ✅ **No hardcoded text** in landing page files
- ✅ **Copy changes require** business approval + snapshot update

## 🚨 **EMERGENCY OVERRIDE**

If you need to temporarily bypass safeguards (NOT RECOMMENDED):

```bash
# Skip snapshot tests (dangerous!)
npm run test -- --run

# Skip linting (dangerous!)
npm run test -- --no-lint
```

**⚠️  WARNING**: Only use in emergencies. Always restore safeguards immediately.

## 📞 **SUPPORT**

If safeguards are triggering unexpectedly:
1. Check if you're importing from `landingCopy.js`
2. Verify no inline text in components
3. Run `npm run test` to see exact differences
4. Contact the development team

---

**Remember**: These safeguards protect the integrity of your landing page copy. Respect them, and they'll keep your content consistent and professional! 🛡️✨


