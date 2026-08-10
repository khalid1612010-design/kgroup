document.addEventListener('DOMContentLoaded', () => {
  const SUPABASE_URL = 'https://ejnafjoxcihjnbirckph.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_oFGT8creC1-om81zg9pEUw_9jcNFtUc';
  const MEDIA_BUCKET = 'kgroup-media';
  const ADMIN_PASSWORD = '2010';
  const WHATSAPP_NUMBER = '201022977499';

  const STORAGE_KEYS = {
    language: 'kgroup_language',
    adminAuth: 'kgroup_admin_auth',
    customerSession: 'kgroup_customer_session'
  };

  const DEFAULT_PRINTING_METHODS = [
    { id: 'uv', nameAr: 'طباعة UV', nameEn: 'UV Printing' },
    { id: 'screen', nameAr: 'سيلك سكرين', nameEn: 'Screen Printing' },
    { id: 'dtf', nameAr: 'DTF', nameEn: 'DTF' },
    { id: 'dtg', nameAr: 'DTG', nameEn: 'DTG' },
    { id: 'laser', nameAr: 'ليزر', nameEn: 'Laser' },
    { id: 'embroidery', nameAr: 'تطريز', nameEn: 'Embroidery' },
    { id: 'heat-transfer', nameAr: 'هوت ترانسفير', nameEn: 'Heat Transfer' },
    { id: 'vinyl', nameAr: 'فينيل', nameEn: 'Vinyl' }
  ];

  const DEFAULT_CATEGORIES = [
    { id: 'notebooks', nameAr: 'دفاتر', nameEn: 'Notebooks' },
    { id: 'mugs', nameAr: 'أكواب', nameEn: 'Mugs' },
    { id: 'business-cards', nameAr: 'كروت شخصية', nameEn: 'Business Cards' },
    { id: 'tshirts', nameAr: 'تيشيرتات', nameEn: 'T-Shirts' },
    { id: 'bags', nameAr: 'شنط', nameEn: 'Bags' },
    { id: 'pens', nameAr: 'أقلام', nameEn: 'Pens' },
    { id: 'stickers', nameAr: 'ستيكرات', nameEn: 'Stickers' },
    { id: 'other', nameAr: 'أخرى', nameEn: 'Other' }
  ];

  const DEFAULT_PRODUCTS = [
    {
      id: 'prod-1',
      categoryId: 'notebooks',
      nameAr: 'دفاتر فاخرة بغطاء كتاني',
      nameEn: 'Premium Linen Notebooks',
      shortDescAr: 'دفاتر أنيقة مناسبة للهدايا المؤسسية والعلامات التجارية الراقية.',
      shortDescEn: 'Elegant notebooks ideal for corporate gifts and refined brand identities.',
      fullDescAr: 'دفاتر بغطاء فاخر وخامة داخلية مريحة للكتابة، مناسبة لطباعة الشعار أو الهوية البصرية للشركات، مع إمكانيات تشطيب متعددة مثل UV والليزر والضغط الحراري.',
      fullDescEn: 'Luxury notebooks with a refined cover finish and smooth inner paper, perfect for logos, visual identities, and premium gifting.',
      image: 'https://images.pexels.com/photos/6786610/pexels-photo-6786610.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      methods: ['uv', 'laser', 'heat-transfer'],
      projectImage: 'https://images.pexels.com/photos/360009/pexels-photo-360009.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      projectDescAr: 'تنفيذ دفاتر بلون فحمي مع لمسة ذهبية لعميل مؤسسي ضمن مؤتمر سنوي.',
      projectDescEn: 'Charcoal notebooks with a subtle gold touch produced for a corporate annual event.'
    },
    {
      id: 'prod-2',
      categoryId: 'mugs',
      nameAr: 'أكواب سيراميك مطفية',
      nameEn: 'Matte Ceramic Mugs',
      shortDescAr: 'أكواب بطبعة مخصصة مناسبة للعلامات التجارية والمقاهي والهدايا.',
      shortDescEn: 'Custom printed mugs for brands, cafés, and stylish promotional gifting.',
      fullDescAr: 'أكواب سيراميك مطفية بتصميم عصري وتشطيب ناعم، قابلة للطباعة بعدة تقنيات حسب الخامة واللون المطلوب.',
      fullDescEn: 'Contemporary matte ceramic mugs with a soft finish, suitable for multiple print techniques depending on color and material needs.',
      image: 'https://images.pexels.com/photos/6312175/pexels-photo-6312175.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      methods: ['screen', 'uv', 'laser'],
      projectImage: 'https://images.pexels.com/photos/6312235/pexels-photo-6312235.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      projectDescAr: 'طباعة شعار لمقهى محلي على أكواب فاتحة بطابع بسيط وراقي.',
      projectDescEn: 'Minimal café logo printing on light-toned mugs with a clean premium finish.'
    },
    {
      id: 'prod-3',
      categoryId: 'business-cards',
      nameAr: 'كروت شخصية سميكة فاخرة',
      nameEn: 'Premium Thick Business Cards',
      shortDescAr: 'كروت شخصية بخامة قوية وتشطيب أنيق يترك انطباعًا احترافيًا.',
      shortDescEn: 'Strong tactile business cards with a premium finish and polished first impression.',
      fullDescAr: 'كروت شخصية مناسبة للمكاتب والشركات والوكالات، مع خيارات تشطيب متعددة وتأثير بصري أنيق.',
      fullDescEn: 'Business cards tailored for offices, agencies, and modern companies with premium tactile finishes and visual effects.',
      image: 'https://images.pexels.com/photos/5706020/pexels-photo-5706020.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      methods: ['uv', 'laser', 'vinyl'],
      projectImage: 'https://images.pexels.com/photos/9878733/pexels-photo-9878733.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      projectDescAr: 'تصميم كروت سميكة لهوية معمارية بلمسات ذهبية وحدود دقيقة.',
      projectDescEn: 'Heavy card stock produced for an architectural brand with gold accents and crisp edges.'
    },
    {
      id: 'prod-4',
      categoryId: 'tshirts',
      nameAr: 'تيشيرتات قطنية للطباعة',
      nameEn: 'Printed Cotton T-Shirts',
      shortDescAr: 'تيشيرتات مناسبة للبراندات والفعاليات والفرق بطرق طباعة متعددة.',
      shortDescEn: 'Cotton t-shirts for brands, events, and teams with multiple print options.',
      fullDescAr: 'تيشيرتات قطنية بخامة جيدة وقصّات مناسبة للبراندات التجارية أو الفعاليات أو الموظفين.',
      fullDescEn: 'Quality cotton t-shirts suited for commercial labels, event uniforms, or team apparel.',
      image: 'https://images.pexels.com/photos/8532611/pexels-photo-8532611.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      methods: ['screen', 'dtf', 'dtg', 'embroidery', 'heat-transfer'],
      projectImage: 'https://images.pexels.com/photos/9558716/pexels-photo-9558716.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      projectDescAr: 'تنفيذ تيشيرتات لفريق إبداعي بطباعة صدرية واضحة ولمسة تطريز بسيطة.',
      projectDescEn: 'Team apparel produced with a clean chest print and subtle embroidery detail.'
    }
  ];

  const DEFAULT_PORTFOLIO = [
    {
      id: 'port-1',
      titleAr: 'دفاتر مؤتمر تنفيذي',
      titleEn: 'Executive Conference Notebooks',
      methodAr: 'طباعة UV و لمسة ذهبية',
      methodEn: 'UV Printing & Gold Accent',
      image: 'https://images.pexels.com/photos/360009/pexels-photo-360009.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      descriptionAr: 'دفاتر بتشطيب فاخر تم تنفيذها لجهة مؤسسية ضمن فعالية رسمية.',
      descriptionEn: 'Premium notebooks executed for a formal corporate event with a refined finish.'
    },
    {
      id: 'port-2',
      titleAr: 'أكواب لمقهى محلي',
      titleEn: 'Custom Mugs for a Local Café',
      methodAr: 'ليزر / سيلك سكرين',
      methodEn: 'Laser / Screen Printing',
      image: 'https://images.pexels.com/photos/3439481/pexels-photo-3439481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      descriptionAr: 'أكواب مخصصة لبراند قهوة بطابع بصري بسيط ومريح.',
      descriptionEn: 'Branded mugs designed for a coffee brand with a clean and elegant style.'
    }
  ];

  const translations = {
    ar: {
      title: 'K GROUP | متجر الطباعة الاحترافي',
      description: 'K GROUP لحلول الطباعة المخصصة والمنتجات الدعائية.',
      'hero.titleLine1': 'مش مجرد منتج',
      'hero.titleLine2': 'دي بصمة براندك',
      'hero.description': 'اختار من مجموعة متنوعة من المنتجات الدعائية والهدايا المخصصة، واضف لمستك الخاصة علشان كل منتج يوصل رسالة براندك ويخليه ديما في ذهن عملائك.',
      'products.all': 'الكل',
      'products.quoteTag': 'عرض سعر عند الطلب',
      'products.viewDetails': 'عرض التفاصيل',
      'products.emptyTitle': 'لا توجد منتجات متاحة.',
      'products.emptyText': 'يمكنك إضافة منتجات من لوحة الإدارة لتظهر هنا.',
      'products.noMatchTitle': 'لا توجد نتائج مطابقة.',
      'products.noMatchText': 'جرّب تغيير كلمة البحث أو القسم المحدد.',
      'admin.filterAllCategories': 'كل الأقسام',
      'quote.selectMethod': 'اختر طريقة الطباعة',
      'quote.noMethod': 'غير محدد',
      'quote.title': 'طلب عرض سعر',
      'quote.orderTitle': 'طلب شراء',
      'quote.subtitle': 'املأ البيانات التالية وسنفتح لك رسالة واتساب جاهزة.',
      'quote.orderSubtitle': 'سيتم حفظ الطلب في قاعدة البيانات ثم فتح رسالة واتساب جاهزة لك.',
      'quote.submit': 'إرسال عبر واتساب',
      'quote.orderSubmit': 'تسجيل الطلب وإرسال عبر واتساب',
      'quote.quoteType': 'عرض سعر',
      'quote.orderType': 'طلب شراء',
      'auth.welcomePrefix': 'مرحبًا',
      'auth.accountRequired': 'لازم يكون عندك حساب على الموقع علشان تطلب المنتج.',
      'auth.accountCreated': 'تم إنشاء الحساب بنجاح.',
      'auth.loggedIn': 'تم تسجيل دخولك بنجاح.',
      'auth.loggedOut': 'تم تسجيل الخروج.',
      'auth.duplicatePhone': 'رقم الهاتف مسجل بالفعل.',
      'messages.formRequiredTitle': 'بيانات ناقصة',
      'messages.formRequiredText': 'يرجى ملء كل الحقول المطلوبة.',
      'messages.methodsRequiredTitle': 'حدد طرق الطباعة',
      'messages.methodsRequiredText': 'اختر طريقة طباعة واحدة على الأقل.',
      'messages.loginSuccessTitle': 'تم الدخول',
      'messages.loginSuccessText': 'تم فتح لوحة الإدارة بنجاح.',
      'messages.loginErrorTitle': 'فشل الدخول',
      'messages.loginErrorText': 'كلمة المرور غير صحيحة.',
      'messages.productAddedTitle': 'تمت الإضافة',
      'messages.productAddedText': 'تمت إضافة المنتج بنجاح.',
      'messages.productUpdatedTitle': 'تم التحديث',
      'messages.productUpdatedText': 'تم تحديث بيانات المنتج بنجاح.',
      'messages.productDeletedTitle': 'تم الحذف',
      'messages.productDeletedText': 'تم حذف المنتج من المتجر.',
      'messages.categoryAddedTitle': 'تمت الإضافة',
      'messages.categoryAddedText': 'تمت إضافة القسم بنجاح.',
      'messages.categoryDeletedTitle': 'تم الحذف',
      'messages.categoryDeletedText': 'تم حذف القسم ونقل المنتجات التابعة له إلى قسم أخرى.',
      'messages.duplicateCategoryTitle': 'القسم موجود',
      'messages.duplicateCategoryText': 'هذا القسم موجود بالفعل.',
      'messages.portfolioAddedTitle': 'تمت الإضافة',
      'messages.portfolioAddedText': 'تمت إضافة العمل بنجاح.',
      'messages.portfolioUpdatedTitle': 'تم التحديث',
      'messages.portfolioUpdatedText': 'تم تحديث العمل بنجاح.',
      'messages.portfolioDeletedTitle': 'تم الحذف',
      'messages.portfolioDeletedText': 'تم حذف العمل من المعرض.',
      'messages.orderSavedTitle': 'تم حفظ الطلب',
      'messages.orderSavedText': 'تم تسجيل طلبك في النظام وفتحه على واتساب.',
      'messages.quoteSavedText': 'تم تسجيل طلبك في النظام.',
      'messages.openWhatsappTitle': 'فتح واتساب',
      'messages.openWhatsappText': 'جاري تجهيز الرسالة وفتح واتساب...',
      'messages.deleteProductConfirmTitle': 'حذف المنتج',
      'messages.deleteProductConfirmText': 'هل أنت متأكد من حذف هذا المنتج؟',
      'messages.deleteCategoryConfirmTitle': 'حذف القسم',
      'messages.deleteCategoryConfirmText': 'هل أنت متأكد من حذف هذا القسم؟',
      'messages.deletePortfolioConfirmTitle': 'حذف العمل',
      'messages.deletePortfolioConfirmText': 'هل أنت متأكد من حذف هذا العمل؟',
      'messages.logoutConfirmTitle': 'تسجيل الخروج',
      'messages.logoutConfirmText': 'هل تريد إنهاء جلسة الإدارة؟',
      'messages.supabaseWarningTitle': 'تنبيه Supabase',
      'messages.supabaseWarningText': 'تعذر تحميل بعض الجداول أو الـ Storage من Supabase. شغّل ملفات الإعداد المطلوبة.',
      'messages.authErrorTitle': 'تعذر تسجيل الدخول',
      'messages.authErrorText': 'تحقق من تجهيز جداول Supabase بالكامل.',
      'messages.genericSaveError': 'حدث خطأ أثناء الحفظ.',
      'messages.invalidPhoneTitle': 'رقم الهاتف غير صحيح',
      'messages.invalidPhoneText': 'اكتب رقم هاتف مصري صحيح مثل 01012345678 أو +201012345678.',
      'messages.uploadErrorTitle': 'فشل رفع الصورة',
      'messages.uploadErrorText': 'تأكد من إنشاء Storage bucket باسم kgroup-media وتفعيل الصلاحيات.',
      'messages.methodAddedTitle': 'تمت الإضافة',
      'messages.methodAddedText': 'تمت إضافة نوع الطباعة الجديد بنجاح.',
      'messages.duplicateMethodTitle': 'الطريقة موجودة',
      'messages.duplicateMethodText': 'نوع الطباعة هذا موجود بالفعل.',
      'login.error': 'بيانات الدخول غير صحيحة.',
      'common.edit': 'تعديل',
      'common.delete': 'حذف',
      'common.save': 'حفظ',
      'common.update': 'تحديث',
      'common.guest': 'زائر'
    },
    en: {
      title: 'K GROUP | Professional Printing Store',
      description: 'K GROUP for custom printing and promotional products.',
      'hero.titleLine1': 'Not just a product',
      'hero.titleLine2': 'it is your brand signature',
      'hero.description': 'Choose from a wide variety of promotional products and custom gifts, then add your own touch so every item carries your brand message and stays in your customers’ minds.',
      'products.all': 'All',
      'products.quoteTag': 'Quote on request',
      'products.viewDetails': 'View Details',
      'products.emptyTitle': 'No products available.',
      'products.emptyText': 'You can add products from the admin panel.',
      'products.noMatchTitle': 'No matching results found.',
      'products.noMatchText': 'Try changing the search keyword or selected category.',
      'admin.filterAllCategories': 'All Categories',
      'quote.selectMethod': 'Select printing method',
      'quote.noMethod': 'Not specified',
      'quote.title': 'Quote Request',
      'quote.orderTitle': 'Purchase Request',
      'quote.subtitle': 'Fill the following details and we will open a ready WhatsApp message.',
      'quote.orderSubtitle': 'Your request will be saved in the database and then WhatsApp will open for you.',
      'quote.submit': 'Send via WhatsApp',
      'quote.orderSubmit': 'Save Request & Send via WhatsApp',
      'quote.quoteType': 'Quote',
      'quote.orderType': 'Order',
      'auth.welcomePrefix': 'Hi',
      'auth.accountRequired': 'You must have an account on the website before placing an order.',
      'auth.accountCreated': 'Account created successfully.',
      'auth.loggedIn': 'You are now logged in.',
      'auth.loggedOut': 'You have been logged out.',
      'auth.duplicatePhone': 'This phone number is already registered.',
      'messages.formRequiredTitle': 'Missing fields',
      'messages.formRequiredText': 'Please fill all required fields.',
      'messages.methodsRequiredTitle': 'Select printing methods',
      'messages.methodsRequiredText': 'Please select at least one printing method.',
      'messages.loginSuccessTitle': 'Logged in',
      'messages.loginSuccessText': 'Admin panel opened successfully.',
      'messages.loginErrorTitle': 'Login failed',
      'messages.loginErrorText': 'Incorrect password.',
      'messages.productAddedTitle': 'Added successfully',
      'messages.productAddedText': 'The product has been added successfully.',
      'messages.productUpdatedTitle': 'Updated successfully',
      'messages.productUpdatedText': 'The product has been updated successfully.',
      'messages.productDeletedTitle': 'Deleted successfully',
      'messages.productDeletedText': 'The product has been deleted from the store.',
      'messages.categoryAddedTitle': 'Added successfully',
      'messages.categoryAddedText': 'The category has been added successfully.',
      'messages.categoryDeletedTitle': 'Deleted successfully',
      'messages.categoryDeletedText': 'The category was deleted and related products were moved to Other.',
      'messages.duplicateCategoryTitle': 'Category already exists',
      'messages.duplicateCategoryText': 'This category already exists.',
      'messages.portfolioAddedTitle': 'Added successfully',
      'messages.portfolioAddedText': 'The project has been added successfully.',
      'messages.portfolioUpdatedTitle': 'Updated successfully',
      'messages.portfolioUpdatedText': 'The project has been updated successfully.',
      'messages.portfolioDeletedTitle': 'Deleted successfully',
      'messages.portfolioDeletedText': 'The project has been removed from the gallery.',
      'messages.orderSavedTitle': 'Request saved',
      'messages.orderSavedText': 'Your request was saved and opened in WhatsApp.',
      'messages.quoteSavedText': 'Your request has been saved in the system.',
      'messages.openWhatsappTitle': 'Opening WhatsApp',
      'messages.openWhatsappText': 'Preparing your message and opening WhatsApp...',
      'messages.deleteProductConfirmTitle': 'Delete product',
      'messages.deleteProductConfirmText': 'Are you sure you want to delete this product?',
      'messages.deleteCategoryConfirmTitle': 'Delete category',
      'messages.deleteCategoryConfirmText': 'Are you sure you want to delete this category?',
      'messages.deletePortfolioConfirmTitle': 'Delete project',
      'messages.deletePortfolioConfirmText': 'Are you sure you want to delete this project?',
      'messages.logoutConfirmTitle': 'Logout',
      'messages.logoutConfirmText': 'Do you want to end the admin session?',
      'messages.supabaseWarningTitle': 'Supabase Warning',
      'messages.supabaseWarningText': 'Some tables or storage settings could not be loaded from Supabase. Please run the required setup scripts.',
      'messages.authErrorTitle': 'Authentication error',
      'messages.authErrorText': 'Please verify that Supabase tables are configured correctly.',
      'messages.genericSaveError': 'An error occurred while saving.',
      'messages.invalidPhoneTitle': 'Invalid phone number',
      'messages.invalidPhoneText': 'Please enter a valid Egyptian phone number like 01012345678 or +201012345678.',
      'messages.uploadErrorTitle': 'Upload failed',
      'messages.uploadErrorText': 'Please create the kgroup-media storage bucket and enable the required policies.',
      'messages.methodAddedTitle': 'Added successfully',
      'messages.methodAddedText': 'The new print method has been added successfully.',
      'messages.duplicateMethodTitle': 'Method already exists',
      'messages.duplicateMethodText': 'This print method already exists.',
      'login.error': 'Invalid login credentials.',
      'common.edit': 'Edit',
      'common.delete': 'Delete',
      'common.save': 'Save',
      'common.update': 'Update',
      'common.guest': 'Guest'
    }
  };

  const state = {
    language: localStorage.getItem(STORAGE_KEYS.language) || 'ar',
    selectedCategory: 'all',
    searchTerm: '',
    currentProductId: null,
    currentRequestMode: 'quote',
    adminAuthenticated: sessionStorage.getItem(STORAGE_KEYS.adminAuth) === 'true',
    activeAdminTab: 'products',
    currentCustomer: null,
    categories: [...DEFAULT_CATEGORIES],
    printingMethods: [...DEFAULT_PRINTING_METHODS],
    products: [...DEFAULT_PRODUCTS],
    portfolio: [...DEFAULT_PORTFOLIO],
    users: [],
    orders: [],
    warningShown: false,
    realtimeChannel: null,
    supabaseReady: !!(window.supabase && typeof window.supabase.createClient === 'function')
  };

  const refs = {
    storeView: document.getElementById('store-view'),
    adminView: document.getElementById('admin-view'),
    toastContainer: document.getElementById('toast-container'),
    languageToggle: document.getElementById('language-toggle'),
    languageToggleLabel: document.getElementById('language-toggle-label'),
    mobileLanguageToggle: document.getElementById('mobile-language-toggle'),
    mobileLanguageToggleLabel: document.getElementById('mobile-language-toggle-label'),
    adminLanguageToggle: document.getElementById('admin-language-toggle'),
    adminLanguageToggleLabel: document.getElementById('admin-language-toggle-label'),
    mobileMenuButton: document.getElementById('mobile-menu-button'),
    mobileMenu: document.getElementById('mobile-menu'),
    guestAuthActions: document.getElementById('guest-auth-actions'),
    userAuthActions: document.getElementById('user-auth-actions'),
    mobileGuestAuthActions: document.getElementById('mobile-guest-auth-actions'),
    mobileUserAuthActions: document.getElementById('mobile-user-auth-actions'),
    userGreeting: document.getElementById('user-greeting'),
    mobileUserGreeting: document.getElementById('mobile-user-greeting'),
    openSignupModal: document.getElementById('open-signup-modal'),
    openLoginModal: document.getElementById('open-login-modal'),
    mobileOpenSignupModal: document.getElementById('mobile-open-signup-modal'),
    mobileOpenLoginModal: document.getElementById('mobile-open-login-modal'),
    customerLogout: document.getElementById('customer-logout'),
    mobileCustomerLogout: document.getElementById('mobile-customer-logout'),
    storeAdminLogin: document.getElementById('store-admin-login'),
    mobileAdminLogin: document.getElementById('mobile-admin-login'),
    footerAdminLogin: document.getElementById('footer-admin-login'),
    backToStore: document.getElementById('back-to-store'),
    adminLogout: document.getElementById('admin-logout'),
    productSearch: document.getElementById('product-search'),
    clearSearch: document.getElementById('clear-search'),
    categoryPills: document.getElementById('category-pills'),
    categoryScrollPrev: document.getElementById('category-scroll-prev'),
    categoryScrollNext: document.getElementById('category-scroll-next'),
    resetFilters: document.getElementById('reset-filters'),
    productsGrid: document.getElementById('products-grid'),
    productsEmpty: document.getElementById('products-empty'),
    productsEmptyTitle: document.getElementById('products-empty-title'),
    productsEmptyText: document.getElementById('products-empty-text'),
    portfolioGrid: document.getElementById('portfolio-grid'),
    portfolioEmpty: document.getElementById('portfolio-empty'),
    detailsModal: document.getElementById('details-modal'),
    quoteModal: document.getElementById('quote-modal'),
    signupModal: document.getElementById('signup-modal'),
    userLoginModal: document.getElementById('user-login-modal'),
    loginModal: document.getElementById('login-modal'),
    productModal: document.getElementById('product-modal'),
    portfolioModal: document.getElementById('portfolio-modal'),
    confirmModal: document.getElementById('confirm-modal'),
    detailsImage: document.getElementById('details-image'),
    detailsProjectImage: document.getElementById('details-project-image'),
    detailsProjectDescription: document.getElementById('details-project-description'),
    detailsCategory: document.getElementById('details-category'),
    detailsTitle: document.getElementById('details-title'),
    detailsDescription: document.getElementById('details-description'),
    detailsMethods: document.getElementById('details-methods'),
    detailsRequestQuote: document.getElementById('details-request-quote'),
    detailsOrderNow: document.getElementById('details-order-now'),
    quoteForm: document.getElementById('quote-form'),
    quoteModalTitle: document.getElementById('quote-modal-title'),
    quoteModalSubtitle: document.getElementById('quote-modal-subtitle'),
    quoteSubmitLabel: document.getElementById('quote-submit-label'),
    quoteProduct: document.getElementById('quote-product'),
    quoteCustomerName: document.getElementById('quote-customer-name'),
    quotePhone: document.getElementById('quote-phone'),
    quoteEmail: document.getElementById('quote-email'),
    quoteQuantity: document.getElementById('quote-quantity'),
    quotePrintingType: document.getElementById('quote-printing-type'),
    quoteNotes: document.getElementById('quote-notes'),
    signupForm: document.getElementById('signup-form'),
    signupName: document.getElementById('signup-name'),
    signupPhone: document.getElementById('signup-phone'),
    signupPassword: document.getElementById('signup-password'),
    toggleSignupPassword: document.getElementById('toggle-signup-password'),
    userLoginForm: document.getElementById('user-login-form'),
    userLoginPhone: document.getElementById('user-login-phone'),
    userLoginPassword: document.getElementById('user-login-password'),
    toggleUserLoginPassword: document.getElementById('toggle-user-login-password'),
    loginForm: document.getElementById('login-form'),
    adminPassword: document.getElementById('admin-password'),
    togglePassword: document.getElementById('toggle-password'),
    loginError: document.getElementById('login-error'),
    adminNavBtns: document.querySelectorAll('.admin-nav-btn'),
    adminTabs: document.querySelectorAll('.admin-tab'),
    openAddProduct: document.getElementById('open-add-product'),
    adminProductSearch: document.getElementById('admin-product-search'),
    adminCategoryFilter: document.getElementById('admin-category-filter'),
    adminProductsBody: document.getElementById('admin-products-body'),
    adminProductsEmpty: document.getElementById('admin-products-empty'),
    categoryForm: document.getElementById('category-form'),
    categoryNameAr: document.getElementById('category-name-ar'),
    categoryNameEn: document.getElementById('category-name-en'),
    adminCategoriesBody: document.getElementById('admin-categories-body'),
    openAddPortfolio: document.getElementById('open-add-portfolio'),
    adminPortfolioGrid: document.getElementById('admin-portfolio-grid'),
    adminPortfolioEmpty: document.getElementById('admin-portfolio-empty'),
    adminUsersBody: document.getElementById('admin-users-body'),
    adminUsersEmpty: document.getElementById('admin-users-empty'),
    adminOrdersBody: document.getElementById('admin-orders-body'),
    adminOrdersEmpty: document.getElementById('admin-orders-empty'),
    productForm: document.getElementById('product-form'),
    productModalTitle: document.getElementById('product-modal-title'),
    productModalSubmitLabel: document.getElementById('product-modal-submit-label'),
    productId: document.getElementById('product-id'),
    productNameAr: document.getElementById('product-name-ar'),
    productNameEn: document.getElementById('product-name-en'),
    productCategory: document.getElementById('product-category'),
    productImage: document.getElementById('product-image'),
    productImageFile: document.getElementById('product-image-file'),
    productImagePreview: document.getElementById('product-image-preview'),
    productShortAr: document.getElementById('product-short-ar'),
    productShortEn: document.getElementById('product-short-en'),
    productFullAr: document.getElementById('product-full-ar'),
    productFullEn: document.getElementById('product-full-en'),
    productPortfolioImage: document.getElementById('product-portfolio-image'),
    productPortfolioImageFile: document.getElementById('product-portfolio-image-file'),
    productPortfolioImagePreview: document.getElementById('product-portfolio-image-preview'),
    productPortfolioDescAr: document.getElementById('product-portfolio-desc-ar'),
    productPortfolioDescEn: document.getElementById('product-portfolio-desc-en'),
    printingMethodCheckboxes: document.getElementById('printing-method-checkboxes'),
    addPrintingMethodBtn: document.getElementById('add-printing-method-btn'),
    newPrintingMethodAr: document.getElementById('new-printing-method-ar'),
    newPrintingMethodEn: document.getElementById('new-printing-method-en'),
    portfolioForm: document.getElementById('portfolio-form'),
    portfolioModalTitle: document.getElementById('portfolio-modal-title'),
    portfolioModalSubmitLabel: document.getElementById('portfolio-modal-submit-label'),
    portfolioId: document.getElementById('portfolio-id'),
    portfolioTitleAr: document.getElementById('portfolio-title-ar'),
    portfolioTitleEn: document.getElementById('portfolio-title-en'),
    portfolioMethodAr: document.getElementById('portfolio-method-ar'),
    portfolioMethodEn: document.getElementById('portfolio-method-en'),
    portfolioImage: document.getElementById('portfolio-image'),
    portfolioImageFile: document.getElementById('portfolio-image-file'),
    portfolioImagePreview: document.getElementById('portfolio-image-preview'),
    portfolioDescAr: document.getElementById('portfolio-desc-ar'),
    portfolioDescEn: document.getElementById('portfolio-desc-en'),
    confirmTitle: document.getElementById('confirm-title'),
    confirmMessage: document.getElementById('confirm-message'),
    confirmCancel: document.getElementById('confirm-cancel'),
    confirmOk: document.getElementById('confirm-ok')
  };

  let confirmAction = null;
  const supabaseClient = state.supabaseReady ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

  function getTranslation(path) {
    return translations[state.language]?.[path] ?? null;
  }

  function t(path) {
    return getTranslation(path) ?? path;
  }

  function escapeHtml(value = '') {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function normalize(value = '') {
    return String(value).trim().toLowerCase();
  }

  function slugify(value = '') {
    return value.toLowerCase().trim().replace(/[^a-z0-9\u0600-\u06FF]+/g, '-').replace(/^-+|-+$/g, '');
  }

  function formatDate(value) {
    if (!value) return '-';
    return new Date(value).toLocaleString(state.language === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  }

  function normalizePhone(input) {
    const raw = String(input || '').replace(/\s+/g, '').replace(/-/g, '');
    if (!raw) return '';
    if (raw.startsWith('+')) return raw;
    if (raw.startsWith('00')) return `+${raw.slice(2)}`;
    if (raw.startsWith('20') && raw.length >= 12) return `+${raw}`;
    if (raw.startsWith('0') && raw.length === 11) return `+20${raw.slice(1)}`;
    if (raw.startsWith('1') && raw.length === 10) return `+20${raw}`;
    return raw;
  }

  function isValidEgyptPhone(phone) {
    return /^\+201[0-2,5]\d{8}$/.test(phone);
  }

  function currentText(arValue, enValue) {
    return state.language === 'ar' ? arValue : enValue;
  }

  function getMethodLabel(methodId) {
    const method = state.printingMethods.find(item => item.id === methodId) || DEFAULT_PRINTING_METHODS.find(item => item.id === methodId);
    return method ? currentText(method.nameAr, method.nameEn) : methodId;
  }

  function getCategoryById(categoryId) {
    return state.categories.find(item => item.id === categoryId) || state.categories.find(item => item.id === 'other') || null;
  }

  function getCategoryLabel(categoryId) {
    const category = getCategoryById(categoryId);
    return category ? currentText(category.nameAr, category.nameEn) : '';
  }

  function getProductName(product) {
    return currentText(product.nameAr, product.nameEn);
  }

  function getProductShort(product) {
    return currentText(product.shortDescAr, product.shortDescEn);
  }

  function getProductFull(product) {
    return currentText(product.fullDescAr, product.fullDescEn);
  }

  function getProductProjectDescription(product) {
    return currentText(product.projectDescAr, product.projectDescEn);
  }

  function getPortfolioTitle(item) {
    return currentText(item.titleAr, item.titleEn);
  }

  function getPortfolioMethod(item) {
    return currentText(item.methodAr, item.methodEn);
  }

  function getPortfolioDescription(item) {
    return currentText(item.descriptionAr, item.descriptionEn);
  }

  function showToast(type, title, message) {
    if (!refs.toastContainer) return;
    const iconMap = { success: 'fa-circle-check', error: 'fa-circle-exclamation', info: 'fa-circle-info' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="fa-solid ${iconMap[type] || 'fa-circle-info'}"></i>
      <div class="toast-content">
        <strong>${escapeHtml(title)}</strong>
        <p>${escapeHtml(message)}</p>
      </div>
      <button class="toast-close" type="button"><i class="fa-solid fa-xmark"></i></button>
    `;
    refs.toastContainer.appendChild(toast);
    const remove = () => toast.remove();
    toast.querySelector('.toast-close')?.addEventListener('click', remove);
    setTimeout(remove, 4500);
  }

  function previewImageSource(previewElement, source) {
    if (!previewElement) return;
    if (source) {
      previewElement.src = source;
      previewElement.classList.remove('hidden');
    } else {
      previewElement.removeAttribute('src');
      previewElement.classList.add('hidden');
    }
  }

  function openModal(modal) {
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.add('hidden');
    const anyOpen = [...document.querySelectorAll('.modal')].some(item => !item.classList.contains('hidden'));
    if (!anyOpen) document.body.style.overflow = '';
  }

  function showConfirm(title, message, callback) {
    refs.confirmTitle.textContent = title;
    refs.confirmMessage.textContent = message;
    confirmAction = callback;
    openModal(refs.confirmModal);
  }

  function closeMobileMenu() {
    refs.mobileMenu?.classList.remove('open');
    refs.mobileMenuButton?.classList.remove('open');
  }

  function switchView(viewName) {
    refs.storeView?.classList.toggle('active', viewName === 'store');
    refs.adminView?.classList.toggle('active', viewName === 'admin');
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateAuthUI() {
    const guestVisible = !state.currentCustomer;
    refs.guestAuthActions?.classList.toggle('hidden', !guestVisible);
    refs.userAuthActions?.classList.toggle('hidden', guestVisible);
    refs.mobileGuestAuthActions?.classList.toggle('hidden', !guestVisible);
    refs.mobileUserAuthActions?.classList.toggle('hidden', guestVisible);

    const name = state.currentCustomer?.full_name || state.currentCustomer?.phone || t('common.guest');
    const greeting = `${t('auth.welcomePrefix')} ${name}`;
    if (refs.userGreeting) refs.userGreeting.textContent = greeting;
    if (refs.mobileUserGreeting) refs.mobileUserGreeting.textContent = greeting;
  }

  function bindFilePreview(fileInput, previewElement) {
    if (!fileInput || !previewElement) return;
    fileInput.addEventListener('change', () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      previewImageSource(previewElement, URL.createObjectURL(file));
    });
  }

  function applyTranslations() {
    document.documentElement.lang = state.language;
    document.documentElement.dir = state.language === 'ar' ? 'rtl' : 'ltr';
    const title = getTranslation('title');
    const description = getTranslation('description');
    if (title) document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) metaDescription.setAttribute('content', description);

    document.querySelectorAll('[data-i18n]').forEach(element => {
      const value = getTranslation(element.dataset.i18n);
      if (value !== null) element.textContent = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const value = getTranslation(element.dataset.i18nPlaceholder);
      if (value !== null) element.setAttribute('placeholder', value);
    });

    const switchLabel = state.language === 'ar' ? 'EN' : 'عربي';
    if (refs.languageToggleLabel) refs.languageToggleLabel.textContent = switchLabel;
    if (refs.mobileLanguageToggleLabel) refs.mobileLanguageToggleLabel.textContent = switchLabel;
    if (refs.adminLanguageToggleLabel) refs.adminLanguageToggleLabel.textContent = switchLabel;

    updateAuthUI();
    populateCategorySelects();
    buildPrintingMethodCheckboxes(getSelectedMethodsFromForm());
    renderCategoryPills();
    renderProducts();
    renderPortfolio();
    renderAdminProducts();
    renderAdminCategories();
    renderAdminPortfolio();
    renderAdminUsers();
    renderAdminOrders();

    if (!refs.detailsModal.classList.contains('hidden') && state.currentProductId) openProductDetails(state.currentProductId);
    if (!refs.quoteModal.classList.contains('hidden') && state.currentProductId) prepareQuoteModal(state.currentProductId, state.currentRequestMode);
  }

  function buildPrintingMethodCheckboxes(selectedMethods = []) {
    if (!refs.printingMethodCheckboxes) return;
    refs.printingMethodCheckboxes.innerHTML = state.printingMethods.map(method => `
      <label class="check-item">
        <input type="checkbox" value="${method.id}" ${selectedMethods.includes(method.id) ? 'checked' : ''}>
        <span>${escapeHtml(currentText(method.nameAr, method.nameEn))}</span>
      </label>
    `).join('');
  }

  function getSelectedMethodsFromForm() {
    return refs.printingMethodCheckboxes ? [...refs.printingMethodCheckboxes.querySelectorAll('input:checked')].map(input => input.value) : [];
  }

  function populateCategorySelects() {
    if (!refs.productCategory || !refs.adminCategoryFilter) return;
    const selectedProductCategory = refs.productCategory.value;
    const selectedAdminCategory = refs.adminCategoryFilter.value || 'all';

    refs.productCategory.innerHTML = state.categories.map(category => `
      <option value="${category.id}">${escapeHtml(currentText(category.nameAr, category.nameEn))}</option>
    `).join('');

    refs.adminCategoryFilter.innerHTML = `
      <option value="all">${escapeHtml(t('admin.filterAllCategories'))}</option>
      ${state.categories.map(category => `<option value="${category.id}">${escapeHtml(currentText(category.nameAr, category.nameEn))}</option>`).join('')}
    `;

    if (selectedProductCategory && state.categories.some(category => category.id === selectedProductCategory)) refs.productCategory.value = selectedProductCategory;
    refs.adminCategoryFilter.value = state.categories.some(category => category.id === selectedAdminCategory) || selectedAdminCategory === 'all' ? selectedAdminCategory : 'all';
  }

  function productMatchesSearch(product, term) {
    const fields = [product.nameAr, product.nameEn, product.shortDescAr, product.shortDescEn, product.fullDescAr, product.fullDescEn, getCategoryLabel(product.categoryId)];
    return fields.some(field => normalize(field).includes(term));
  }

  function renderCategoryPills() {
    if (!refs.categoryPills) return;
    refs.categoryPills.innerHTML = `
      <button class="category-pill ${state.selectedCategory === 'all' ? 'active' : ''}" data-category="all">${escapeHtml(t('products.all'))}</button>
      ${state.categories.map(category => `<button class="category-pill ${state.selectedCategory === category.id ? 'active' : ''}" data-category="${category.id}">${escapeHtml(currentText(category.nameAr, category.nameEn))}</button>`).join('')}
    `;

    refs.categoryPills.querySelectorAll('.category-pill').forEach(button => {
      button.addEventListener('click', () => {
        state.selectedCategory = button.dataset.category;
        renderCategoryPills();
        renderProducts();
      });
    });
  }

  function renderProducts() {
    if (!refs.productsGrid || !refs.productsEmpty) return;
    const term = normalize(state.searchTerm);
    const filtered = state.products.filter(product => {
      const categoryMatch = state.selectedCategory === 'all' || product.categoryId === state.selectedCategory;
      const searchMatch = !term || productMatchesSearch(product, term);
      return categoryMatch && searchMatch;
    });

    if (!filtered.length) {
      refs.productsGrid.innerHTML = '';
      refs.productsEmpty.classList.remove('hidden');
      if (!state.products.length) {
        refs.productsEmptyTitle.textContent = t('products.emptyTitle');
        refs.productsEmptyText.textContent = t('products.emptyText');
      } else {
        refs.productsEmptyTitle.textContent = t('products.noMatchTitle');
        refs.productsEmptyText.textContent = t('products.noMatchText');
      }
      return;
    }

    refs.productsEmpty.classList.add('hidden');
    refs.productsGrid.innerHTML = filtered.map(product => `
      <article class="product-card" data-product-id="${product.id}">
        <div class="product-media">
          <img src="${escapeHtml(product.image)}" alt="${escapeHtml(getProductName(product))}" loading="lazy">
          <span class="product-badge">${escapeHtml(getCategoryLabel(product.categoryId))}</span>
        </div>
        <div class="product-body">
          <h3>${escapeHtml(getProductName(product))}</h3>
          <p>${escapeHtml(getProductShort(product))}</p>
          <div class="product-footer">
            <span class="quote-tag">${escapeHtml(t('products.quoteTag'))}</span>
            <button class="primary-outline-btn small-btn view-product" type="button" data-product-id="${product.id}">${escapeHtml(t('products.viewDetails'))}</button>
          </div>
        </div>
      </article>
    `).join('');

  }

  function renderPortfolio() {
    if (!refs.portfolioGrid || !refs.portfolioEmpty) return;
    if (!state.portfolio.length) {
      refs.portfolioGrid.innerHTML = '';
      refs.portfolioEmpty.classList.remove('hidden');
      return;
    }

    refs.portfolioEmpty.classList.add('hidden');
    refs.portfolioGrid.innerHTML = state.portfolio.map(item => `
      <article class="portfolio-card">
        <div class="portfolio-media">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(getPortfolioTitle(item))}" loading="lazy">
          <span class="portfolio-method">${escapeHtml(getPortfolioMethod(item))}</span>
        </div>
        <div class="portfolio-body">
          <h3>${escapeHtml(getPortfolioTitle(item))}</h3>
          <p>${escapeHtml(getPortfolioDescription(item))}</p>
        </div>
      </article>
    `).join('');
  }

  function renderAdminProducts() {
    if (!refs.adminProductsBody || !refs.adminProductsEmpty) return;
    const searchValue = normalize(refs.adminProductSearch?.value || '');
    const categoryValue = refs.adminCategoryFilter?.value || 'all';
    const filtered = state.products.filter(product => {
      const categoryMatch = categoryValue === 'all' || product.categoryId === categoryValue;
      const searchMatch = !searchValue || productMatchesSearch(product, searchValue);
      return categoryMatch && searchMatch;
    });

    if (!filtered.length) {
      refs.adminProductsBody.innerHTML = '';
      refs.adminProductsEmpty.classList.remove('hidden');
      return;
    }

    refs.adminProductsEmpty.classList.add('hidden');
    refs.adminProductsBody.innerHTML = filtered.map(product => `
      <tr>
        <td><img class="admin-thumb" src="${escapeHtml(product.image)}" alt="${escapeHtml(getProductName(product))}"></td>
        <td>${escapeHtml(getProductName(product))}</td>
        <td>${escapeHtml(getCategoryLabel(product.categoryId))}</td>
        <td><div class="admin-method-tags">${product.methods.map(method => `<span>${escapeHtml(getMethodLabel(method))}</span>`).join('')}</div></td>
        <td>
          <div class="table-actions">
            <button class="icon-btn edit edit-product" type="button" data-id="${product.id}"><i class="fa-solid fa-pen"></i></button>
            <button class="icon-btn delete delete-product" type="button" data-id="${product.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');

  }

  function renderAdminCategories() {
    if (!refs.adminCategoriesBody) return;
    refs.adminCategoriesBody.innerHTML = state.categories.map(category => `
      <tr>
        <td>${escapeHtml(category.nameAr)} / ${escapeHtml(category.nameEn)}</td>
        <td>
          <div class="table-actions">
            ${category.id !== 'other' ? `<button class="icon-btn delete delete-category" type="button" data-id="${category.id}"><i class="fa-solid fa-trash"></i></button>` : ''}
          </div>
        </td>
      </tr>
    `).join('');

  }

  function renderAdminPortfolio() {
    if (!refs.adminPortfolioGrid || !refs.adminPortfolioEmpty) return;
    if (!state.portfolio.length) {
      refs.adminPortfolioGrid.innerHTML = '';
      refs.adminPortfolioEmpty.classList.remove('hidden');
      return;
    }

    refs.adminPortfolioEmpty.classList.add('hidden');
    refs.adminPortfolioGrid.innerHTML = state.portfolio.map(item => `
      <article class="admin-portfolio-card">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(getPortfolioTitle(item))}">
        <div class="admin-portfolio-body">
          <h3>${escapeHtml(getPortfolioTitle(item))}</h3>
          <span class="admin-portfolio-meta">${escapeHtml(getPortfolioMethod(item))}</span>
          <p>${escapeHtml(getPortfolioDescription(item))}</p>
        </div>
        <div class="admin-portfolio-actions">
          <button class="ghost-btn small-btn edit-portfolio" type="button" data-id="${item.id}"><i class="fa-solid fa-pen"></i>${escapeHtml(t('common.edit'))}</button>
          <button class="danger-btn small-btn delete-portfolio" type="button" data-id="${item.id}"><i class="fa-solid fa-trash"></i>${escapeHtml(t('common.delete'))}</button>
        </div>
      </article>
    `).join('');

  }

  function renderAdminUsers() {
    if (!refs.adminUsersBody || !refs.adminUsersEmpty) return;
    if (!state.users.length) {
      refs.adminUsersBody.innerHTML = '';
      refs.adminUsersEmpty.classList.remove('hidden');
      return;
    }

    refs.adminUsersEmpty.classList.add('hidden');
    refs.adminUsersBody.innerHTML = state.users.map(user => `
      <tr>
        <td>${escapeHtml(user.full_name || '-')}</td>
        <td>${escapeHtml(user.phone || '-')}</td>
        <td>${escapeHtml(user.password_text || '-')}</td>
        <td>${escapeHtml(user.id || '-')}</td>
        <td>${escapeHtml(formatDate(user.created_at))}</td>
      </tr>
    `).join('');
  }

  function renderAdminOrders() {
    if (!refs.adminOrdersBody || !refs.adminOrdersEmpty) return;
    if (!state.orders.length) {
      refs.adminOrdersBody.innerHTML = '';
      refs.adminOrdersEmpty.classList.remove('hidden');
      return;
    }

    refs.adminOrdersEmpty.classList.add('hidden');
    refs.adminOrdersBody.innerHTML = state.orders.map(order => `
      <tr>
        <td>${escapeHtml(order.customer_name || '-')}</td>
        <td>${escapeHtml(order.phone || '-')}</td>
        <td>${escapeHtml(currentText(order.product_name_ar, order.product_name_en) || '-')}</td>
        <td>${escapeHtml(order.request_type === 'order' ? t('quote.orderType') : t('quote.quoteType'))}</td>
        <td>${escapeHtml(String(order.quantity || '-'))}</td>
        <td>${escapeHtml(order.printing_type || t('quote.noMethod'))}</td>
        <td>${escapeHtml(formatDate(order.created_at))}</td>
      </tr>
    `).join('');
  }

  function openProductDetails(productId) {
    const product = state.products.find(item => item.id === productId);
    if (!product) return;
    state.currentProductId = productId;
    refs.detailsImage.src = product.image;
    refs.detailsImage.alt = getProductName(product);
    refs.detailsProjectImage.src = product.projectImage;
    refs.detailsProjectImage.alt = getProductName(product);
    refs.detailsProjectDescription.textContent = getProductProjectDescription(product);
    refs.detailsCategory.textContent = getCategoryLabel(product.categoryId);
    refs.detailsTitle.textContent = getProductName(product);
    refs.detailsDescription.textContent = getProductFull(product);
    refs.detailsMethods.innerHTML = product.methods.map(method => `<span>${escapeHtml(getMethodLabel(method))}</span>`).join('');
    openModal(refs.detailsModal);
  }

  function prepareQuoteModal(productId, mode = 'quote') {
    const product = state.products.find(item => item.id === productId);
    if (!product) return;
    state.currentProductId = productId;
    state.currentRequestMode = mode;
    refs.quoteProduct.value = getProductName(product);
    refs.quotePrintingType.innerHTML = `
      <option value="">${escapeHtml(t('quote.selectMethod'))}</option>
      ${product.methods.map(methodId => `<option value="${escapeHtml(getMethodLabel(methodId))}">${escapeHtml(getMethodLabel(methodId))}</option>`).join('')}
    `;
    refs.quoteCustomerName.value = state.currentCustomer?.full_name || '';
    refs.quotePhone.value = state.currentCustomer?.phone || '';

    if (mode === 'order') {
      refs.quoteModalTitle.textContent = t('quote.orderTitle');
      refs.quoteModalSubtitle.textContent = t('quote.orderSubtitle');
      refs.quoteSubmitLabel.textContent = t('quote.orderSubmit');
    } else {
      refs.quoteModalTitle.textContent = t('quote.title');
      refs.quoteModalSubtitle.textContent = t('quote.subtitle');
      refs.quoteSubmitLabel.textContent = t('quote.submit');
    }

    openModal(refs.quoteModal);
  }

  function mapCategoryRow(row) {
    return { id: row.id, nameAr: row.name_ar, nameEn: row.name_en, createdAt: row.created_at };
  }

  function mapMethodRow(row) {
    return { id: row.id, nameAr: row.name_ar, nameEn: row.name_en, createdAt: row.created_at };
  }

  function mapProductRow(row) {
    return {
      id: row.id,
      categoryId: row.category_id,
      nameAr: row.name_ar,
      nameEn: row.name_en,
      shortDescAr: row.short_desc_ar,
      shortDescEn: row.short_desc_en,
      fullDescAr: row.full_desc_ar,
      fullDescEn: row.full_desc_en,
      image: row.image,
      methods: Array.isArray(row.methods) ? row.methods : [],
      projectImage: row.project_image,
      projectDescAr: row.project_desc_ar,
      projectDescEn: row.project_desc_en,
      createdAt: row.created_at
    };
  }

  function mapPortfolioRow(row) {
    return {
      id: row.id,
      titleAr: row.title_ar,
      titleEn: row.title_en,
      methodAr: row.method_ar,
      methodEn: row.method_en,
      image: row.image,
      descriptionAr: row.description_ar,
      descriptionEn: row.description_en,
      createdAt: row.created_at
    };
  }

  async function uploadFileToStorage(file, folder) {
    if (!file || !supabaseClient) return null;
    const safeName = file.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9._-]/g, '');
    const filePath = `${folder}/${Date.now()}-${safeName}`;
    const { error } = await supabaseClient.storage.from(MEDIA_BUCKET).upload(filePath, file, { upsert: true });
    if (error) {
      showToast('error', t('messages.uploadErrorTitle'), error.message || t('messages.uploadErrorText'));
      return null;
    }
    const { data } = supabaseClient.storage.from(MEDIA_BUCKET).getPublicUrl(filePath);
    return data?.publicUrl || null;
  }

  async function safeSelect(tableName, mapper, fallback = []) {
    if (!supabaseClient) return fallback;
    const { data, error } = await supabaseClient.from(tableName).select('*');
    if (error) {
      showSupabaseWarning(error);
      return fallback;
    }
    return Array.isArray(data) ? data.map(mapper) : fallback;
  }

  async function loadPrintingMethods() {
    const methods = await safeSelect('printing_methods', mapMethodRow, DEFAULT_PRINTING_METHODS);
    state.printingMethods = methods.length ? methods : DEFAULT_PRINTING_METHODS;
    buildPrintingMethodCheckboxes(getSelectedMethodsFromForm());
    renderAdminProducts();
  }

  async function loadPublicCollections() {
    const [categories, products, portfolio] = await Promise.all([
      safeSelect('categories', mapCategoryRow, DEFAULT_CATEGORIES),
      safeSelect('products', mapProductRow, DEFAULT_PRODUCTS),
      safeSelect('portfolio_items', mapPortfolioRow, DEFAULT_PORTFOLIO)
    ]);

    state.categories = categories.length ? categories : DEFAULT_CATEGORIES;
    if (!state.categories.some(item => item.id === 'other')) state.categories.push({ id: 'other', nameAr: 'أخرى', nameEn: 'Other' });
    state.products = products;
    state.portfolio = portfolio;
    populateCategorySelects();
    renderCategoryPills();
    renderProducts();
    renderPortfolio();
    renderAdminProducts();
    renderAdminCategories();
    renderAdminPortfolio();
  }

  async function loadUsersAndOrders() {
    if (!supabaseClient) return;
    const [usersResponse, ordersResponse] = await Promise.all([
      supabaseClient.from('customer_accounts').select('*').order('created_at', { ascending: false }),
      supabaseClient.from('orders').select('*').order('created_at', { ascending: false })
    ]);

    state.users = usersResponse.error ? [] : (usersResponse.data || []);
    state.orders = ordersResponse.error ? [] : (ordersResponse.data || []);
    if (usersResponse.error) showSupabaseWarning(usersResponse.error);
    if (ordersResponse.error) showSupabaseWarning(ordersResponse.error);
    renderAdminUsers();
    renderAdminOrders();
  }

  function saveCustomerSession(customer) {
    state.currentCustomer = customer;
    localStorage.setItem(STORAGE_KEYS.customerSession, JSON.stringify(customer));
    updateAuthUI();
  }

  function clearCustomerSession() {
    state.currentCustomer = null;
    localStorage.removeItem(STORAGE_KEYS.customerSession);
    updateAuthUI();
  }

  async function initializeCustomerSession() {
    const raw = localStorage.getItem(STORAGE_KEYS.customerSession);
    if (!raw || !supabaseClient) {
      updateAuthUI();
      return;
    }
    try {
      const saved = JSON.parse(raw);
      if (!saved?.id) {
        clearCustomerSession();
        return;
      }
      const { data, error } = await supabaseClient.from('customer_accounts').select('*').eq('id', saved.id).maybeSingle();
      if (error || !data) {
        clearCustomerSession();
        return;
      }
      state.currentCustomer = data;
      updateAuthUI();
    } catch {
      clearCustomerSession();
    }
  }

  function initializeRealtime() {
    if (!supabaseClient) return;
    if (state.realtimeChannel) supabaseClient.removeChannel(state.realtimeChannel);

    state.realtimeChannel = supabaseClient
      .channel('kgroup-live-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, loadPublicCollections)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, async () => {
        await loadPublicCollections();
        if (!refs.detailsModal.classList.contains('hidden') && state.currentProductId) openProductDetails(state.currentProductId);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'portfolio_items' }, loadPublicCollections)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'printing_methods' }, loadPrintingMethods)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'customer_accounts' }, loadUsersAndOrders)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, loadUsersAndOrders)
      .subscribe();
  }

  async function addPrintingMethod() {
    if (!supabaseClient) return;
    const nameAr = refs.newPrintingMethodAr.value.trim();
    const nameEn = refs.newPrintingMethodEn.value.trim();
    if (!nameAr || !nameEn) {
      showToast('error', t('messages.formRequiredTitle'), t('messages.formRequiredText'));
      return;
    }
    const id = slugify(nameEn) || slugify(nameAr) || `method-${Date.now()}`;
    const exists = state.printingMethods.some(method => method.id === id || normalize(method.nameAr) === normalize(nameAr) || normalize(method.nameEn) === normalize(nameEn));
    if (exists) {
      showToast('info', t('messages.duplicateMethodTitle'), t('messages.duplicateMethodText'));
      return;
    }

    const { error } = await supabaseClient.from('printing_methods').upsert({ id, name_ar: nameAr, name_en: nameEn }, { onConflict: 'id' });
    if (error) {
      showToast('error', t('messages.genericSaveError'), error.message || t('messages.genericSaveError'));
      return;
    }

    const selected = getSelectedMethodsFromForm();
    if (!selected.includes(id)) selected.push(id);
    refs.newPrintingMethodAr.value = '';
    refs.newPrintingMethodEn.value = '';
    await loadPrintingMethods();
    buildPrintingMethodCheckboxes(selected);
    showToast('success', t('messages.methodAddedTitle'), t('messages.methodAddedText'));
  }

  async function signUpUser(name, phone, password) {
    if (!supabaseClient) return;
    const normalizedPhone = normalizePhone(phone);
    if (!isValidEgyptPhone(normalizedPhone)) {
      showToast('error', t('messages.invalidPhoneTitle'), t('messages.invalidPhoneText'));
      return;
    }

    const { data: existing, error: existingError } = await supabaseClient.from('customer_accounts').select('*').eq('phone', normalizedPhone).maybeSingle();
    if (existingError) {
      showToast('error', t('messages.authErrorTitle'), existingError.message || t('messages.authErrorText'));
      return;
    }
    if (existing) {
      showToast('error', t('auth.signup'), t('auth.duplicatePhone'));
      return;
    }

    const { data, error } = await supabaseClient.from('customer_accounts').insert({
      id: crypto.randomUUID(),
      full_name: name,
      phone: normalizedPhone,
      password_text: password
    }).select().single();

    if (error) {
      showToast('error', t('messages.authErrorTitle'), error.message || t('messages.authErrorText'));
      return;
    }

    saveCustomerSession(data);
    refs.signupForm.reset();
    closeModal(refs.signupModal);
    await loadUsersAndOrders();
    showToast('success', t('auth.signup'), t('auth.accountCreated'));
  }

  async function signInUser(phone, password) {
    if (!supabaseClient) return;
    const normalizedPhone = normalizePhone(phone);
    if (!isValidEgyptPhone(normalizedPhone)) {
      showToast('error', t('messages.invalidPhoneTitle'), t('messages.invalidPhoneText'));
      return;
    }

    const { data, error } = await supabaseClient.from('customer_accounts').select('*').eq('phone', normalizedPhone).eq('password_text', password).maybeSingle();
    if (error) {
      showToast('error', t('messages.authErrorTitle'), error.message || t('messages.authErrorText'));
      return;
    }
    if (!data) {
      showToast('error', t('messages.authErrorTitle'), t('login.error'));
      return;
    }

    saveCustomerSession(data);
    refs.userLoginForm.reset();
    closeModal(refs.userLoginModal);
    showToast('success', t('auth.login'), t('auth.loggedIn'));
  }

  function signOutCustomer() {
    clearCustomerSession();
    showToast('info', t('auth.logout'), t('auth.loggedOut'));
  }

  async function deleteProduct(productId) {
    const { error } = await supabaseClient.from('products').delete().eq('id', productId);
    if (error) {
      showToast('error', t('messages.genericSaveError'), error.message || t('messages.genericSaveError'));
      return;
    }
    state.products = state.products.filter(item => item.id !== productId);
    renderProducts();
    renderAdminProducts();
    showToast('success', t('messages.productDeletedTitle'), t('messages.productDeletedText'));
  }

  async function deleteCategory(categoryId) {
    state.products = state.products.map(product => product.categoryId === categoryId ? { ...product, categoryId: 'other' } : product);
    for (const product of state.products.filter(item => item.categoryId === 'other')) {
      await supabaseClient.from('products').upsert({
        id: product.id,
        category_id: product.categoryId,
        name_ar: product.nameAr,
        name_en: product.nameEn,
        short_desc_ar: product.shortDescAr,
        short_desc_en: product.shortDescEn,
        full_desc_ar: product.fullDescAr,
        full_desc_en: product.fullDescEn,
        image: product.image,
        methods: product.methods,
        project_image: product.projectImage,
        project_desc_ar: product.projectDescAr,
        project_desc_en: product.projectDescEn
      }, { onConflict: 'id' });
    }
    const { error } = await supabaseClient.from('categories').delete().eq('id', categoryId);
    if (error) {
      showToast('error', t('messages.genericSaveError'), error.message || t('messages.genericSaveError'));
      return;
    }
    state.categories = state.categories.filter(item => item.id !== categoryId);
    if (!state.categories.some(item => item.id === 'other')) state.categories.push({ id: 'other', nameAr: 'أخرى', nameEn: 'Other' });
    if (state.selectedCategory === categoryId) state.selectedCategory = 'all';
    populateCategorySelects();
    renderCategoryPills();
    renderProducts();
    renderAdminProducts();
    renderAdminCategories();
    showToast('success', t('messages.categoryDeletedTitle'), t('messages.categoryDeletedText'));
  }

  async function deletePortfolio(portfolioId) {
    const { error } = await supabaseClient.from('portfolio_items').delete().eq('id', portfolioId);
    if (error) {
      showToast('error', t('messages.genericSaveError'), error.message || t('messages.genericSaveError'));
      return;
    }
    state.portfolio = state.portfolio.filter(item => item.id !== portfolioId);
    renderPortfolio();
    renderAdminPortfolio();
    showToast('success', t('messages.portfolioDeletedTitle'), t('messages.portfolioDeletedText'));
  }

  async function saveProductFromForm() {
    const methods = getSelectedMethodsFromForm();
    if (!methods.length) {
      showToast('error', t('messages.methodsRequiredTitle'), t('messages.methodsRequiredText'));
      return;
    }

    let mainImageUrl = refs.productImage.value.trim();
    let projectImageUrl = refs.productPortfolioImage.value.trim();
    const mainFile = refs.productImageFile.files?.[0] || null;
    const projectFile = refs.productPortfolioImageFile.files?.[0] || null;

    if (mainFile) {
      const uploaded = await uploadFileToStorage(mainFile, 'products/main');
      if (!uploaded) return;
      mainImageUrl = uploaded;
    }
    if (projectFile) {
      const uploaded = await uploadFileToStorage(projectFile, 'products/projects');
      if (!uploaded) return;
      projectImageUrl = uploaded;
    }

    const payload = {
      id: refs.productId.value || `prod-${Date.now()}`,
      categoryId: refs.productCategory.value,
      nameAr: refs.productNameAr.value.trim(),
      nameEn: refs.productNameEn.value.trim(),
      shortDescAr: refs.productShortAr.value.trim(),
      shortDescEn: refs.productShortEn.value.trim(),
      fullDescAr: refs.productFullAr.value.trim(),
      fullDescEn: refs.productFullEn.value.trim(),
      image: mainImageUrl,
      methods,
      projectImage: projectImageUrl,
      projectDescAr: refs.productPortfolioDescAr.value.trim(),
      projectDescEn: refs.productPortfolioDescEn.value.trim()
    };

    if (!payload.nameAr || !payload.nameEn || !payload.categoryId || !payload.image || !payload.projectImage) {
      showToast('error', t('messages.formRequiredTitle'), t('messages.formRequiredText'));
      return;
    }

    const { error } = await supabaseClient.from('products').upsert({
      id: payload.id,
      category_id: payload.categoryId,
      name_ar: payload.nameAr,
      name_en: payload.nameEn,
      short_desc_ar: payload.shortDescAr,
      short_desc_en: payload.shortDescEn,
      full_desc_ar: payload.fullDescAr,
      full_desc_en: payload.fullDescEn,
      image: payload.image,
      methods: payload.methods,
      project_image: payload.projectImage,
      project_desc_ar: payload.projectDescAr,
      project_desc_en: payload.projectDescEn
    }, { onConflict: 'id' });

    if (error) {
      showToast('error', t('messages.genericSaveError'), error.message || t('messages.genericSaveError'));
      return;
    }

    const isEditing = Boolean(refs.productId.value);
    const existingIndex = state.products.findIndex(product => product.id === payload.id);
    if (existingIndex >= 0) state.products[existingIndex] = payload;
    else state.products.push(payload);

    closeModal(refs.productModal);
    renderProducts();
    renderAdminProducts();
    showToast('success', isEditing ? t('messages.productUpdatedTitle') : t('messages.productAddedTitle'), isEditing ? t('messages.productUpdatedText') : t('messages.productAddedText'));
  }

  async function saveCategoryFromForm() {
    const nameAr = refs.categoryNameAr.value.trim();
    const nameEn = refs.categoryNameEn.value.trim();
    if (!nameAr || !nameEn) {
      showToast('error', t('messages.formRequiredTitle'), t('messages.formRequiredText'));
      return;
    }
    const exists = state.categories.some(category => normalize(category.nameAr) === normalize(nameAr) || normalize(category.nameEn) === normalize(nameEn));
    if (exists) {
      showToast('info', t('messages.duplicateCategoryTitle'), t('messages.duplicateCategoryText'));
      return;
    }

    const payload = { id: `${slugify(nameEn)}-${Date.now()}`, nameAr, nameEn };
    const { error } = await supabaseClient.from('categories').upsert({ id: payload.id, name_ar: payload.nameAr, name_en: payload.nameEn }, { onConflict: 'id' });
    if (error) {
      showToast('error', t('messages.genericSaveError'), error.message || t('messages.genericSaveError'));
      return;
    }

    state.categories.push(payload);
    refs.categoryForm.reset();
    populateCategorySelects();
    renderCategoryPills();
    renderAdminCategories();
    renderAdminProducts();
    showToast('success', t('messages.categoryAddedTitle'), t('messages.categoryAddedText'));
  }

  async function savePortfolioFromForm() {
    let imageUrl = refs.portfolioImage.value.trim();
    const file = refs.portfolioImageFile.files?.[0] || null;
    if (file) {
      const uploaded = await uploadFileToStorage(file, 'portfolio');
      if (!uploaded) return;
      imageUrl = uploaded;
    }

    const payload = {
      id: refs.portfolioId.value || `port-${Date.now()}`,
      titleAr: refs.portfolioTitleAr.value.trim(),
      titleEn: refs.portfolioTitleEn.value.trim(),
      methodAr: refs.portfolioMethodAr.value.trim(),
      methodEn: refs.portfolioMethodEn.value.trim(),
      image: imageUrl,
      descriptionAr: refs.portfolioDescAr.value.trim(),
      descriptionEn: refs.portfolioDescEn.value.trim()
    };

    if (!payload.titleAr || !payload.titleEn || !payload.methodAr || !payload.methodEn || !payload.image || !payload.descriptionAr || !payload.descriptionEn) {
      showToast('error', t('messages.formRequiredTitle'), t('messages.formRequiredText'));
      return;
    }

    const { error } = await supabaseClient.from('portfolio_items').upsert({
      id: payload.id,
      title_ar: payload.titleAr,
      title_en: payload.titleEn,
      method_ar: payload.methodAr,
      method_en: payload.methodEn,
      image: payload.image,
      description_ar: payload.descriptionAr,
      description_en: payload.descriptionEn
    }, { onConflict: 'id' });

    if (error) {
      showToast('error', t('messages.genericSaveError'), error.message || t('messages.genericSaveError'));
      return;
    }

    const isEditing = Boolean(refs.portfolioId.value);
    const existingIndex = state.portfolio.findIndex(item => item.id === payload.id);
    if (existingIndex >= 0) state.portfolio[existingIndex] = payload;
    else state.portfolio.push(payload);

    closeModal(refs.portfolioModal);
    renderPortfolio();
    renderAdminPortfolio();
    showToast('success', isEditing ? t('messages.portfolioUpdatedTitle') : t('messages.portfolioAddedTitle'), isEditing ? t('messages.portfolioUpdatedText') : t('messages.portfolioAddedText'));
  }

  async function saveRequestFromForm() {
    const product = state.products.find(item => item.id === state.currentProductId);
    const customerName = refs.quoteCustomerName.value.trim();
    const phone = normalizePhone(refs.quotePhone.value.trim());
    const email = refs.quoteEmail.value.trim();
    const quantity = refs.quoteQuantity.value.trim();
    const printingType = refs.quotePrintingType.value || t('quote.noMethod');
    const notes = refs.quoteNotes.value.trim() || '-';
    const requestType = state.currentRequestMode;

    if (!product || !customerName || !phone || !quantity) {
      showToast('error', t('messages.formRequiredTitle'), t('messages.formRequiredText'));
      return;
    }
    if (!isValidEgyptPhone(phone)) {
      showToast('error', t('messages.invalidPhoneTitle'), t('messages.invalidPhoneText'));
      return;
    }
    if (requestType === 'order' && !state.currentCustomer) {
      closeModal(refs.quoteModal);
      openModal(refs.userLoginModal);
      showToast('error', t('auth.login'), t('auth.accountRequired'));
      return;
    }

    const { error } = await supabaseClient.from('orders').insert({
      id: crypto.randomUUID(),
      account_id: state.currentCustomer?.id || null,
      user_id: null,
      product_id: product.id,
      product_name_ar: product.nameAr,
      product_name_en: product.nameEn,
      customer_name: customerName,
      phone,
      email: email || null,
      quantity: Number(quantity),
      printing_type: printingType,
      notes,
      request_type: requestType,
      status: 'new'
    });

    if (error) {
      showToast('error', t('messages.genericSaveError'), error.message || t('messages.genericSaveError'));
      return;
    }

    const message = [
      '*K GROUP Request*',
      '',
      `*Type | النوع:* ${requestType === 'order' ? t('quote.orderType') : t('quote.quoteType')}`,
      `*Product | المنتج:* ${getProductName(product)}`,
      `*Customer | العميل:* ${customerName}`,
      `*Phone | الهاتف:* ${phone}`,
      `*Email | البريد:* ${email || '-'}`,
      `*Quantity | الكمية:* ${quantity}`,
      `*Printing Type | نوع الطباعة:* ${printingType}`,
      `*Notes | الملاحظات:* ${notes}`,
      '',
      '_Generated from K GROUP_'
    ].join('\n');

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    closeModal(refs.quoteModal);
    refs.quoteForm.reset();
    await loadUsersAndOrders();
    showToast('info', t('messages.openWhatsappTitle'), t('messages.openWhatsappText'));
    showToast('success', t('messages.orderSavedTitle'), requestType === 'order' ? t('messages.orderSavedText') : t('messages.quoteSavedText'));
    setTimeout(() => window.open(whatsappUrl, '_blank'), 300);
  }

  function resetProductForm() {
    refs.productForm.reset();
    refs.productId.value = '';
    refs.productImage.value = '';
    refs.productPortfolioImage.value = '';
    if (refs.productImageFile) refs.productImageFile.value = '';
    if (refs.productPortfolioImageFile) refs.productPortfolioImageFile.value = '';
    previewImageSource(refs.productImagePreview, null);
    previewImageSource(refs.productPortfolioImagePreview, null);
    buildPrintingMethodCheckboxes([]);
  }

  function resetPortfolioForm() {
    refs.portfolioForm.reset();
    refs.portfolioId.value = '';
    refs.portfolioImage.value = '';
    if (refs.portfolioImageFile) refs.portfolioImageFile.value = '';
    previewImageSource(refs.portfolioImagePreview, null);
  }

  function openProductModal(productId = null) {
    resetProductForm();
    populateCategorySelects();

    if (productId) {
      const product = state.products.find(item => item.id === productId);
      if (!product) return;
      refs.productId.value = product.id;
      refs.productNameAr.value = product.nameAr;
      refs.productNameEn.value = product.nameEn;
      refs.productCategory.value = product.categoryId;
      refs.productImage.value = product.image;
      refs.productShortAr.value = product.shortDescAr;
      refs.productShortEn.value = product.shortDescEn;
      refs.productFullAr.value = product.fullDescAr;
      refs.productFullEn.value = product.fullDescEn;
      refs.productPortfolioImage.value = product.projectImage;
      refs.productPortfolioDescAr.value = product.projectDescAr;
      refs.productPortfolioDescEn.value = product.projectDescEn;
      previewImageSource(refs.productImagePreview, product.image);
      previewImageSource(refs.productPortfolioImagePreview, product.projectImage);
      buildPrintingMethodCheckboxes(product.methods || []);
      refs.productModalTitle.textContent = `${t('common.edit')} - ${getProductName(product)}`;
      refs.productModalSubmitLabel.textContent = t('common.update');
    } else {
      refs.productModalTitle.textContent = t('admin.addProduct');
      refs.productModalSubmitLabel.textContent = t('common.save');
    }

    openModal(refs.productModal);
  }

  function openPortfolioModal(portfolioId = null) {
    resetPortfolioForm();

    if (portfolioId) {
      const item = state.portfolio.find(entry => entry.id === portfolioId);
      if (!item) return;
      refs.portfolioId.value = item.id;
      refs.portfolioTitleAr.value = item.titleAr;
      refs.portfolioTitleEn.value = item.titleEn;
      refs.portfolioMethodAr.value = item.methodAr;
      refs.portfolioMethodEn.value = item.methodEn;
      refs.portfolioImage.value = item.image;
      refs.portfolioDescAr.value = item.descriptionAr;
      refs.portfolioDescEn.value = item.descriptionEn;
      previewImageSource(refs.portfolioImagePreview, item.image);
      refs.portfolioModalTitle.textContent = `${t('common.edit')} - ${getPortfolioTitle(item)}`;
      refs.portfolioModalSubmitLabel.textContent = t('common.update');
    } else {
      refs.portfolioModalTitle.textContent = t('admin.addPortfolio');
      refs.portfolioModalSubmitLabel.textContent = t('common.save');
    }

    openModal(refs.portfolioModal);
  }

  window.openProductAdminModal = openProductModal;
  window.openPortfolioAdminModal = openPortfolioModal;

  function bindEvents() {
    document.addEventListener('click', async event => {
      const target = event.target.closest('button, .product-card, .view-product');
      if (!target) return;

      if (target.matches('#open-add-product')) {
        event.preventDefault();
        openProductModal();
        return;
      }

      if (target.matches('#open-add-portfolio')) {
        event.preventDefault();
        openPortfolioModal();
        return;
      }

      if (target.matches('.edit-product')) {
        event.preventDefault();
        openProductModal(target.dataset.id);
        return;
      }

      if (target.matches('.delete-product')) {
        event.preventDefault();
        showConfirm(t('messages.deleteProductConfirmTitle'), t('messages.deleteProductConfirmText'), async () => deleteProduct(target.dataset.id));
        return;
      }

      if (target.matches('.edit-portfolio')) {
        event.preventDefault();
        openPortfolioModal(target.dataset.id);
        return;
      }

      if (target.matches('.delete-portfolio')) {
        event.preventDefault();
        showConfirm(t('messages.deletePortfolioConfirmTitle'), t('messages.deletePortfolioConfirmText'), async () => deletePortfolio(target.dataset.id));
        return;
      }

      if (target.matches('.delete-category')) {
        event.preventDefault();
        showConfirm(t('messages.deleteCategoryConfirmTitle'), t('messages.deleteCategoryConfirmText'), async () => deleteCategory(target.dataset.id));
        return;
      }

      if (target.matches('.view-product') || target.matches('.product-card')) {
        const productId = target.dataset.productId || target.closest('.product-card')?.dataset.productId;
        if (productId) {
          event.preventDefault();
          openProductDetails(productId);
        }
      }
    });

    refs.languageToggle?.addEventListener('click', () => {
      state.language = state.language === 'ar' ? 'en' : 'ar';
      localStorage.setItem(STORAGE_KEYS.language, state.language);
      applyTranslations();
    });
    refs.mobileLanguageToggle?.addEventListener('click', () => {
      state.language = state.language === 'ar' ? 'en' : 'ar';
      localStorage.setItem(STORAGE_KEYS.language, state.language);
      applyTranslations();
    });
    refs.adminLanguageToggle?.addEventListener('click', () => {
      state.language = state.language === 'ar' ? 'en' : 'ar';
      localStorage.setItem(STORAGE_KEYS.language, state.language);
      applyTranslations();
    });

    refs.mobileMenuButton?.addEventListener('click', () => {
      refs.mobileMenuButton.classList.toggle('open');
      refs.mobileMenu.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-link').forEach(link => link.addEventListener('click', closeMobileMenu));
    [refs.openSignupModal, refs.mobileOpenSignupModal].forEach(button => button?.addEventListener('click', () => { closeMobileMenu(); openModal(refs.signupModal); }));
    [refs.openLoginModal, refs.mobileOpenLoginModal].forEach(button => button?.addEventListener('click', () => { closeMobileMenu(); openModal(refs.userLoginModal); }));
    [refs.storeAdminLogin, refs.mobileAdminLogin, refs.footerAdminLogin].forEach(button => button?.addEventListener('click', () => { closeMobileMenu(); openModal(refs.loginModal); }));
    refs.customerLogout?.addEventListener('click', signOutCustomer);
    refs.mobileCustomerLogout?.addEventListener('click', () => { closeMobileMenu(); signOutCustomer(); });
    refs.backToStore?.addEventListener('click', () => switchView('store'));

    refs.adminLogout?.addEventListener('click', () => {
      showConfirm(t('messages.logoutConfirmTitle'), t('messages.logoutConfirmText'), () => {
        state.adminAuthenticated = false;
        sessionStorage.removeItem(STORAGE_KEYS.adminAuth);
        switchView('store');
      });
    });

    refs.productSearch?.addEventListener('input', event => {
      state.searchTerm = event.target.value;
      refs.clearSearch?.classList.toggle('hidden', !state.searchTerm.trim());
      renderProducts();
    });

    refs.clearSearch?.addEventListener('click', () => {
      state.searchTerm = '';
      refs.productSearch.value = '';
      refs.clearSearch.classList.add('hidden');
      renderProducts();
    });

    refs.resetFilters?.addEventListener('click', () => {
      state.searchTerm = '';
      state.selectedCategory = 'all';
      refs.productSearch.value = '';
      refs.clearSearch.classList.add('hidden');
      renderCategoryPills();
      renderProducts();
    });

    refs.categoryScrollPrev?.addEventListener('click', () => {
      refs.categoryPills.scrollBy({ left: document.documentElement.dir === 'rtl' ? 220 : -220, behavior: 'smooth' });
    });
    refs.categoryScrollNext?.addEventListener('click', () => {
      refs.categoryPills.scrollBy({ left: document.documentElement.dir === 'rtl' ? -220 : 220, behavior: 'smooth' });
    });

    refs.detailsRequestQuote?.addEventListener('click', () => {
      closeModal(refs.detailsModal);
      prepareQuoteModal(state.currentProductId, 'quote');
    });
    refs.detailsOrderNow?.addEventListener('click', () => {
      closeModal(refs.detailsModal);
      if (!state.currentCustomer) {
        showToast('error', t('auth.login'), t('auth.accountRequired'));
        openModal(refs.userLoginModal);
        return;
      }
      prepareQuoteModal(state.currentProductId, 'order');
    });

    refs.signupForm?.addEventListener('submit', async event => {
      event.preventDefault();
      const name = refs.signupName.value.trim();
      const phone = refs.signupPhone.value.trim();
      const password = refs.signupPassword.value.trim();
      if (!name || !phone || !password) {
        showToast('error', t('messages.formRequiredTitle'), t('messages.formRequiredText'));
        return;
      }
      await signUpUser(name, phone, password);
    });

    refs.userLoginForm?.addEventListener('submit', async event => {
      event.preventDefault();
      const phone = refs.userLoginPhone.value.trim();
      const password = refs.userLoginPassword.value.trim();
      if (!phone || !password) {
        showToast('error', t('messages.formRequiredTitle'), t('messages.formRequiredText'));
        return;
      }
      await signInUser(phone, password);
    });

    refs.quoteForm?.addEventListener('submit', async event => {
      event.preventDefault();
      await saveRequestFromForm();
    });

    refs.toggleSignupPassword?.addEventListener('click', () => {
      const isPassword = refs.signupPassword.type === 'password';
      refs.signupPassword.type = isPassword ? 'text' : 'password';
      refs.toggleSignupPassword.innerHTML = `<i class="fa-solid ${isPassword ? 'fa-eye-slash' : 'fa-eye'}"></i>`;
    });
    refs.toggleUserLoginPassword?.addEventListener('click', () => {
      const isPassword = refs.userLoginPassword.type === 'password';
      refs.userLoginPassword.type = isPassword ? 'text' : 'password';
      refs.toggleUserLoginPassword.innerHTML = `<i class="fa-solid ${isPassword ? 'fa-eye-slash' : 'fa-eye'}"></i>`;
    });
    refs.togglePassword?.addEventListener('click', () => {
      const isPassword = refs.adminPassword.type === 'password';
      refs.adminPassword.type = isPassword ? 'text' : 'password';
      refs.togglePassword.innerHTML = `<i class="fa-solid ${isPassword ? 'fa-eye-slash' : 'fa-eye'}"></i>`;
    });

    refs.loginForm?.addEventListener('submit', event => {
      event.preventDefault();
      if (refs.adminPassword.value === ADMIN_PASSWORD) {
        state.adminAuthenticated = true;
        sessionStorage.setItem(STORAGE_KEYS.adminAuth, 'true');
        refs.loginError.classList.add('hidden');
        refs.loginForm.reset();
        closeModal(refs.loginModal);
        switchView('admin');
        loadUsersAndOrders();
        showToast('success', t('messages.loginSuccessTitle'), t('messages.loginSuccessText'));
      } else {
        refs.loginError.classList.remove('hidden');
        const card = refs.loginModal.querySelector('.modal-card');
        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 400);
        showToast('error', t('messages.loginErrorTitle'), t('messages.loginErrorText'));
      }
    });

    refs.adminNavBtns.forEach(button => {
      button.addEventListener('click', () => {
        state.activeAdminTab = button.dataset.tab;
        refs.adminNavBtns.forEach(item => item.classList.toggle('active', item === button));
        refs.adminTabs.forEach(tab => tab.classList.toggle('active', tab.id === `admin-tab-${state.activeAdminTab}`));
        if (state.activeAdminTab === 'users' || state.activeAdminTab === 'orders') loadUsersAndOrders();
      });
    });

    refs.openAddProduct?.addEventListener('click', () => openProductModal());
    refs.openAddPortfolio?.addEventListener('click', () => openPortfolioModal());
    refs.adminProductSearch?.addEventListener('input', renderAdminProducts);
    refs.adminCategoryFilter?.addEventListener('change', renderAdminProducts);
    refs.addPrintingMethodBtn?.addEventListener('click', addPrintingMethod);

    refs.categoryForm?.addEventListener('submit', async event => {
      event.preventDefault();
      await saveCategoryFromForm();
    });
    refs.productForm?.addEventListener('submit', async event => {
      event.preventDefault();
      await saveProductFromForm();
    });
    refs.portfolioForm?.addEventListener('submit', async event => {
      event.preventDefault();
      await savePortfolioFromForm();
    });

    refs.confirmCancel?.addEventListener('click', () => {
      confirmAction = null;
      closeModal(refs.confirmModal);
    });
    refs.confirmOk?.addEventListener('click', () => {
      if (typeof confirmAction === 'function') confirmAction();
      confirmAction = null;
      closeModal(refs.confirmModal);
    });

    document.querySelectorAll('[data-close]').forEach(button => {
      button.addEventListener('click', () => {
        const modal = document.getElementById(button.dataset.close);
        if (modal) closeModal(modal);
      });
    });

    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', event => {
        if (event.target === modal) closeModal(modal);
      });
    });

    bindFilePreview(refs.productImageFile, refs.productImagePreview);
    bindFilePreview(refs.productPortfolioImageFile, refs.productPortfolioImagePreview);
    bindFilePreview(refs.portfolioImageFile, refs.portfolioImagePreview);
  }

  function showSupabaseWarning(error) {
    if (state.warningShown) return;
    state.warningShown = true;
    showToast('error', t('messages.supabaseWarningTitle'), t('messages.supabaseWarningText'));
    console.error(error);
  }

  async function initialize() {
    refs.clearSearch?.classList.toggle('hidden', !refs.productSearch?.value?.trim());
    buildPrintingMethodCheckboxes([]);
    bindEvents();
    applyTranslations();

    if (!supabaseClient) {
      showToast('error', t('messages.supabaseWarningTitle'), t('messages.supabaseWarningText'));
      switchView(state.adminAuthenticated ? 'admin' : 'store');
      return;
    }

    await initializeCustomerSession();
    await loadPrintingMethods();
    await loadPublicCollections();
    await loadUsersAndOrders();
    initializeRealtime();
    switchView(state.adminAuthenticated ? 'admin' : 'store');
  }

  initialize();
});