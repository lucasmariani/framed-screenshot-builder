// Pixel canvases, not a promise of placement eligibility. Recheck provider previews before upload.
(function (root) {
  const reddit = 'https://www.business.reddit.com/learning-hub/articles/reddit-image-ad-specs';
  const carousel = 'https://www.business.reddit.com/advertise/ad-types/carousel-ads';
  const google = 'https://support.google.com/google-ads/answer/9948381';
  const meta = 'https://www.facebook.com/business/ads-guide';
  root.OMATO_FORMAT_PRESETS = [
    {id:'asc-69', label:'App Store · iPhone 6.9-inch', width:1320, height:2868, note:'Existing Omato App Store master. Verify current App Store slot before upload.'},
    {id:'reddit-carousel-square', label:'Reddit · square carousel', width:1200, height:1200, maxBytes:20000000, source:carousel, checkedAt:'2026-09-24', note:'Square carousel master. Keep every card the same ratio; verify feed and conversation previews.'},
    {id:'reddit-image-square', label:'Reddit · square image', width:1080, height:1080, maxBytes:3000000, source:reddit, checkedAt:'2026-09-24', note:'Image-ad preset; 3 MB limit in the current Reddit image guide.'},
    {id:'reddit-image-portrait', label:'Reddit · portrait image', width:1080, height:1350, maxBytes:3000000, source:reddit, checkedAt:'2026-09-24', note:'4:5 image ad. Do not assume the same ratios are enabled for every carousel placement.'},
    {id:'reddit-image-landscape', label:'Reddit · landscape image', width:1920, height:1080, maxBytes:3000000, source:reddit, checkedAt:'2026-09-24', note:'16:9 image ad. Check mobile crop and readability.'},
    {id:'reddit-thumbnail', label:'Reddit · conversation thumbnail', width:400, height:300, maxBytes:500000, source:reddit, checkedAt:'2026-09-24', note:'Thumbnail only. Use a simple composition, not a reduced full carousel card.'},
    {id:'meta-square', label:'Meta · square carousel', width:1080, height:1080, source:meta+'/update/carousel', maxBytes:30000000, checkedAt:'2026-09-24', note:'Verified Facebook Feed carousel guide: 1:1, at least 1080 × 1080. Confirm other placements and objective in Ads Manager.'},
    {id:'meta-feed', label:'Facebook / Instagram · 4:5 feed', width:1440, height:1800, source:meta+'/update/image/facebook-feed', additionalSource:meta+'/update/image/instagram-feed', maxBytes:30000000, checkedAt:'2026-09-24', note:'Verified Facebook and Instagram Feed image guides: 4:5, 1440 × 1800. Check automatic cropping and objective-specific previews.'},
    {id:'meta-vertical', label:'Facebook / Instagram · 9:16 vertical', width:1440, height:2560, source:meta+'/update/image/instagram-story', maxBytes:30000000, checkedAt:'2026-09-24', safeInsets:{top:.14,bottom:.35,left:.06,right:.06}, note:'Verified Instagram Stories image guide: 9:16, 1440 × 2560; guide reserves 14% top, 35% bottom and 6% sides. Preview other vertical placements separately; this PNG is not a video.'},
    {id:'google-app-square', label:'Google App campaigns · square', width:1200, height:1200, maxBytes:5000000, source:google, checkedAt:'2026-09-24', note:'1:1 App campaign image asset; PNG/JPG ≤5 MB. Assets may be combined automatically.'},
    {id:'google-app-landscape', label:'Google App campaigns · landscape', width:1200, height:628, maxBytes:5000000, source:google, checkedAt:'2026-09-24', note:'1200 × 628 App campaign image asset. This is not Reddit’s 16:9 preset.'},
    {id:'google-app-portrait', label:'Google App campaigns · portrait', width:1200, height:1500, maxBytes:5000000, source:google, checkedAt:'2026-09-24', note:'4:5 App campaign image asset; PNG/JPG ≤5 MB.'}
  ];
  if (typeof module !== 'undefined') module.exports = root.OMATO_FORMAT_PRESETS;
})(globalThis);
