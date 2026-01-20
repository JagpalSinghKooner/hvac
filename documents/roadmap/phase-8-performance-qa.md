# Phase 8 — Performance, QA & Launch

## Purpose
Launch a stable, fast, and measurable website.

## Status
⏸️ **PENDING** - Starts after Phase 7 (SEO Refinement) is complete

### Prerequisites:
- ✅ Phase 0-5: Foundation, content, routing, rendering, UI complete
- 🔄 Phase 6: Lead generation components (IN PROGRESS)
- ⏸️ Phase 7: SEO refinement and metadata optimization (PENDING)

---

## Starting Prompt

```
Phase 8: Performance, QA & Launch - Final Testing & Deployment

Project: B.A.P Heating & Cooling - HVAC website built with Astro + React + shadcn/ui + Tailwind CSS
Location: /Users/jagpalkooner/Desktop/HVAC

Current Status:
✅ Phase 1-7: Complete site with conversion components and SEO optimization
✅ 616 pages built with professional design
✅ All metadata optimized, schema.org implemented
✅ Internal linking and local SEO complete
🟢 Ready for comprehensive QA and launch preparation

Project Structure:
- 616 production-ready pages
- Full component library
- Optimized metadata and schema
- Local SEO signals in place
- Conversion-optimized design

Phase 8 Tasks: Performance Auditing, QA, and Launch Preparation

1. Performance Auditing (Lighthouse + Core Web Vitals):
   - Build production version (npm run build)
   - Run Lighthouse audits on production build (not dev server)
   - Test on key pages: homepage, service page, location page, hybrid page
   - Target scores:
     - Performance: 90+ (green)
     - Accessibility: 95+ (green)
     - Best Practices: 95+ (green)
     - SEO: 95+ (green)
   - Measure Core Web Vitals:
     - Largest Contentful Paint (LCP): < 2.5s
     - First Input Delay (FID): < 100ms
     - Cumulative Layout Shift (CLS): < 0.1
   - Identify and fix performance bottlenecks

2. Accessibility Testing (WCAG 2.1 AA Compliance):
   - Run automated accessibility tests (axe-core, Lighthouse)
   - Manual keyboard navigation testing:
     - Tab order logical on all pages
     - Focus visible on all interactive elements
     - Escape key closes modals/drawers
     - Enter/Space activates buttons
   - Screen reader testing (VoiceOver on Mac, NVDA on Windows):
     - Proper heading structure announced
     - Images have descriptive alt text
     - Forms have proper labels
     - Links have descriptive text
   - Color contrast verification (WCAG AA):
     - Text contrast ratio: 4.5:1 minimum
     - Large text (18pt+): 3:1 minimum
     - UI components: 3:1 minimum
   - Test with accessibility tools:
     - WAVE browser extension
     - axe DevTools
     - Lighthouse accessibility audit
   - Fix any issues found:
     - Color contrast problems
     - Missing alt text
     - Improper heading hierarchy
     - Missing ARIA labels

3. Cross-Device & Browser Testing:
   - Mobile devices (iOS Safari, Chrome Android):
     - iPhone 12/13/14 (iOS Safari)
     - Samsung Galaxy S21/S22 (Chrome)
     - Tablet: iPad Pro (Safari)
   - Desktop browsers:
     - Chrome (latest)
     - Safari (latest)
     - Firefox (latest)
     - Edge (latest)
   - Test responsive breakpoints:
     - Mobile: 375px, 414px
     - Tablet: 768px, 1024px
     - Desktop: 1280px, 1440px, 1920px
   - Verify:
     - Navigation works on all devices
     - Forms submit properly
     - CTAs are clickable/tappable
     - Images load correctly
     - No horizontal scroll
     - Touch targets 44x44px minimum

4. Functional QA Testing:
   - Navigation:
     - Desktop mega menu works
     - Mobile drawer opens/closes
     - All links go to correct pages
     - Breadcrumbs accurate
   - Forms:
     - Contact form validation works
     - Phone numbers clickable (tel: links)
     - Email links work (mailto:)
     - Form submission handling
   - CTAs:
     - Phone CTA works on all pages
     - Emergency badge appears correctly
     - All buttons have hover states
   - Content:
     - No broken links (internal or external)
     - All images load
     - Alt text present on images
     - No typos or formatting issues
   - Service-location pages:
     - All 616 pages render correctly
     - Dynamic content populates properly
     - No missing data

5. SEO Technical Validation:
   - Run final Lighthouse SEO audit (95+ score)
   - Verify sitemap.xml:
     - All 616 pages included
     - Valid XML format
     - Accessible at /sitemap-index.xml
   - Check robots.txt:
     - Proper allow/disallow rules
     - Sitemap reference included
   - Validate structured data:
     - Google Rich Results Test on key pages
     - Schema.org validator
     - No errors or warnings
   - Check canonical tags:
     - Self-referential on all pages
     - No canonicalization issues
   - Verify meta tags:
     - Unique titles on all pages
     - Unique descriptions on all pages
     - Open Graph tags complete
   - Test social sharing:
     - Facebook sharing preview
     - Twitter card preview
     - LinkedIn preview

6. Security & Best Practices:
   - HTTPS enforcement (when deployed)
   - No mixed content warnings
   - No console errors in production
   - Security headers configured (when deployed):
     - X-Content-Type-Options
     - X-Frame-Options
     - Content-Security-Policy
   - No exposed sensitive data
   - Forms have CSRF protection (if applicable)

7. Analytics & Tracking Setup:
   - Install Google Analytics 4 (GA4)
   - Set up Google Search Console
   - Configure conversion tracking:
     - Phone number clicks
     - Form submissions
     - CTA clicks
   - Add Google Tag Manager (optional)
   - Verify tracking works in production

8. Pre-Launch Checklist:
   - [ ] All 616 pages render without errors
   - [ ] Build completes in <10s
   - [ ] Lighthouse scores: 90+ on all metrics
   - [ ] No accessibility violations
   - [ ] Cross-browser testing complete
   - [ ] Mobile-responsive verified
   - [ ] All forms tested
   - [ ] Analytics installed and working
   - [ ] Sitemap submitted to Google Search Console
   - [ ] Robots.txt configured
   - [ ] Favicon present
   - [ ] 404 page exists and styled
   - [ ] Domain DNS configured
   - [ ] SSL certificate installed
   - [ ] Hosting platform configured
   - [ ] CDN setup (if using)
   - [ ] Backup strategy in place

9. Deployment:
   - Choose hosting platform:
     - Vercel (recommended for Astro)
     - Netlify
     - Cloudflare Pages
     - AWS Amplify
   - Configure deployment:
     - Connect Git repository
     - Set build command: npm run build
     - Set output directory: dist
     - Configure environment variables (if any)
   - Enable automatic deployments on push
   - Set up custom domain
   - Enable HTTPS/SSL
   - Configure redirects (if needed)
   - Test production deployment
   - Verify all pages accessible on live domain

10. Post-Launch Monitoring (First 48 hours):
    - Monitor Google Search Console for crawl errors
    - Check analytics for traffic patterns
    - Verify forms are receiving submissions
    - Monitor for broken links or 404s
    - Check page load times on live site
    - Monitor server/hosting metrics
    - Review any user feedback

Tools & Resources:
- Lighthouse CLI or Chrome DevTools
- Google PageSpeed Insights
- Google Rich Results Test
- Google Search Console
- WebAIM WAVE tool
- axe DevTools browser extension
- BrowserStack (cross-browser testing)
- Real devices for mobile testing

Success Criteria:
- Performance: 90+ on Lighthouse
- Accessibility: 95+ on Lighthouse (WCAG 2.1 AA)
- SEO: 95+ on Lighthouse
- Best Practices: 95+ on Lighthouse
- All 616 pages render correctly on all devices
- No critical bugs or broken functionality
- Analytics tracking properly
- Successful deployment to production
- Site accessible on custom domain with HTTPS

Start Phase 8: Build production version and run comprehensive Lighthouse audits first.
```

---

## Focus Areas

### 1. Performance Auditing
- Run Lighthouse on production build (not dev server)
- Optimize Core Web Vitals (LCP, FID, CLS)
- Identify and fix render-blocking resources
- Verify image optimization

### 2. Cross-Device Testing
- Test on real mobile devices (iOS and Android)
- Verify responsive breakpoints
- Check touch target sizes
- Ensure smooth mobile experience

### 3. Accessibility Compliance
- WCAG 2.1 AA compliance verification
- Keyboard navigation testing
- Screen reader testing
- Color contrast validation

### 4. Analytics & Conversion Tracking
- Google Analytics 4 setup
- Conversion goal tracking
- Phone click tracking
- Form submission tracking

---

## Expected Outcomes

✅ Confident public launch with no critical issues
✅ 90+ Lighthouse performance score
✅ 95+ Lighthouse accessibility score
✅ 95+ Lighthouse SEO score
✅ Successful deployment to production hosting
✅ Analytics and conversion tracking in place
✅ Cross-device compatibility verified
✅ All 616 pages accessible and functional

---

## Testing Checklist

### Performance Testing
- [ ] Production build created
- [ ] Lighthouse audits run on key pages
- [ ] Core Web Vitals measured (LCP, FID, CLS)
- [ ] Performance issues identified and fixed
- [ ] Target: 90+ performance score

### Accessibility Testing
- [ ] Automated accessibility audit (Lighthouse, axe)
- [ ] Keyboard navigation tested
- [ ] Screen reader testing completed
- [ ] Color contrast validated (WCAG AA)
- [ ] Focus indicators visible
- [ ] Target: 95+ accessibility score

### Cross-Browser Testing
- [ ] Chrome (desktop and mobile)
- [ ] Safari (desktop and mobile)
- [ ] Firefox (desktop)
- [ ] Edge (desktop)
- [ ] Real device testing (iOS, Android)

### Functional Testing
- [ ] All navigation works
- [ ] Forms submit properly
- [ ] Phone/email links work
- [ ] CTAs clickable
- [ ] No broken links
- [ ] Images load correctly

### SEO Validation
- [ ] Sitemap.xml accessible
- [ ] Robots.txt configured
- [ ] Structured data validated
- [ ] Meta tags unique
- [ ] Canonical tags correct
- [ ] Target: 95+ SEO score

### Pre-Launch
- [ ] Analytics installed (GA4)
- [ ] Search Console verified
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Hosting platform ready
- [ ] Backup strategy in place

---

## Launch Day Checklist

1. [ ] Final production build
2. [ ] Deploy to hosting platform
3. [ ] Verify custom domain works
4. [ ] HTTPS/SSL enabled
5. [ ] Test all key pages on live site
6. [ ] Submit sitemap to Google Search Console
7. [ ] Verify analytics tracking
8. [ ] Monitor for 24-48 hours
9. [ ] Document any issues found
10. [ ] Celebrate launch! 🎉

---

## Notes

- **IMPORTANT**: Always test production builds, not dev server (dev is unminified, uncompressed)
- Performance scores will be much better on production builds
- Use real devices for mobile testing when possible
- Accessibility testing should include manual testing, not just automated tools
- Monitor Google Search Console closely after launch for crawl errors
- Keep a launch checklist and check off items as you complete them
