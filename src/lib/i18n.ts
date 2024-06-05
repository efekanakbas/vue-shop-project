import { createI18n } from 'vue-i18n'

function getStartingLocale() {
  if (localStorage.getItem('last-locale')) {
    return localStorage.getItem('last-locale')
  }
  return 'en'
}

export const i18n = createI18n({
  legacy: false,
  //@ts-expect-error
  locale: getStartingLocale(),
  fallbackLocale: 'tr',
  messages: {
    en: {
      navbar: {
        first: 'Man',
        second: 'Women',
        third: 'Electronics',
        fourth: 'Jewelery',
        fifth: 'Close',
        sixth: 'Categories',
        seventh: 'You can buy anything you want!',
        auth: {
          first: 'Auth',
          second: 'Login',
          third: 'Register',
          fourth: 'Logout'
        }
      },
      homePage: {
        first: {
          heading: 'Clothings!',
          subheading: {
            first: {
              title: 'Man',
              subtitle: "men's clothing"
            },
            second: {
              title: 'Woman',
              subtitle: "women's clothing"
            }
          }
        },
        second: { title: 'Electronics!', subtitle: 'electronics' },
        third: { title: 'Jewelery!', subtitle: 'jewelery' }
      },
      button: {
        cart: 'Add to cart',
        close: 'Close',
        buy: 'But it!',
        update: 'Update',
        apply: 'Apply',
        deleteAll: 'Delete All',
        submit: 'Submit'
      },
      sheet: {
        heading: 'Your Cart'
      },
      category: {
        men: {
          heading: 'Men',
          subheading: "Men's Clothing"
        },
        women: {
          heading: 'Women',
          subheading: "Women's Clothing"
        },
        electronics: {
          heading: 'Electronics',
          subheading: 'Electronics'
        },
        jewelery: {
          heading: 'Mücevher',
          subheading: 'Jewelery'
        },
        tooltip: 'To Product Page'
      },
      cart: {
        alert: {
          title: 'Heads up!',
          desc: 'You have no product in your cart.'
        },
        title: 'Shopping Cart',
        subtitle: 'in your cart.',
        left: {
          first: 'Product',
          second: 'Price',
          third: 'Quantity',
          fourth: 'Total Price'
        },
        right: {
          first: {
            title: 'Calculated Shipping',
            select: {
              placeholder: 'Select a country',
              heading: 'Countries',
              first: 'Turkiye',
              second: 'Azerbaijan',
              third: 'Uzbekistan',
              fourth: 'Kazakhistan'
            },
            type: {
              placeholder: 'User type',
              heading: 'Types',
              first: 'Person',
              second: 'Company'
            },
            zip: 'ZIP code'
          },
          second: {
            title: 'Coupon Code',
            placeholder: 'Coupon Code'
          },
          third: {
            title: 'Cart Total',
            first: 'Cart Subtotal',
            second: 'Country',
            third: 'Discount',
            fourth: 'Cart Total'
          }
        }
      },
      auth: {
        email: {
          title: 'E-mail',
          bottomMessage: 'You have to type E-mail here'
        },
        password: {
          title: 'Password',
          bottomMessage: 'You have to type Password here'
        },
        login: {
          title: 'Login Form',
          subtitle: 'Login for interactions',
          link: 'Are you new here?'
        },
        register: {
          title: 'Register Form',
          subtitle: 'Register for dive into productions',
          link: 'Are you already cool?',
          username: {
            title: 'Username',
            bottomMessage: 'You have to type Username here'
          },
          confirm: {
            title: 'Confirm',
            bottomMessage: 'You have to type Confirm here'
          }
        }
      },
      toast: {
        inc: {
          title: "You can't increase it anymore",
          desc: 'You can increase up to 10'
        },
        reset: {
          title: "You can't reset your cart",
          desc: 'You have no product in your cart'
        },
        add: {
          title: "You can't add any more",
          desc: 'You can add up to 10'
        }
      }
    },
    tr: {
      navbar: {
        first: 'Erkek',
        second: 'Kadın',
        third: 'Elektronik',
        fourth: 'Mücevher',
        fifth: 'Kapat',
        sixth: 'Kategoriler',
        seventh: 'İstediğiniz herhangi bir şeyi satın alabilirsiniz!',
        auth: {
          first: 'Hesap',
          second: 'Giriş',
          third: 'Kayıt',
          fourth: 'Çıkış'
        }
      },
      homePage: {
        first: {
          heading: 'Kıyafetler!',
          subheading: {
            first: {
              title: 'Erkek',
              subtitle: 'erkek giyim'
            },
            second: {
              title: 'Kadın',
              subtitle: 'kadın giyim'
            }
          }
        },
        second: { title: 'Elektronikler!', subtitle: 'elektronikler' },
        third: { title: 'Mücevherler!', subtitle: 'mücevherler' }
      },
      button: {
        cart: 'Sepete ekle',
        close: 'Kapat',
        buy: 'Satın al!',
        update: 'Güncelle',
        apply: 'Uygula',
        deleteAll: 'Hepsini Sil',
        cancel: 'Cancel',
        submit: 'Kaydet'
      },
      sheet: {
        heading: 'Sepetin'
      },
      category: {
        men: {
          heading: 'Erkek',
          subheading: 'Erkek giyim'
        },
        women: {
          heading: 'Kadın',
          subheading: 'Kadın giyim'
        },
        electronics: {
          heading: 'Elektronik',
          subheading: 'Elektronik'
        },
        jewelery: {
          heading: 'Mücevher',
          subheading: 'Mücevher'
        },
        tooltip: 'Ürün Sayfasına Git'
      },
      cart: {
        alert: {
          title: 'Üzgünüz!',
          desc: 'Sepetinde henüz bir ürün yok.'
        },
        title: 'Sepetindekiler',
        subtitle: 'ürünün var.',
        left: {
          first: 'Ürün',
          second: 'Fiyat',
          third: 'Miktar',
          fourth: 'Toplam Tutar'
        },
        right: {
          first: {
            title: 'Kargo Ayarları',
            select: {
              placeholder: 'Ülke seç',
              heading: 'Ülkeler',
              first: 'Türkiye',
              second: 'Azerbaycan',
              third: 'Özbekistan',
              fourth: 'Kazakistan'
            },
            type: {
              placeholder: 'Kullanıcı tipi',
              heading: 'Tipler',
              first: 'Kişi',
              second: 'Şirket'
            },
            zip: 'ZIP kodu'
          },
          second: {
            title: 'Kupon Kodu',
            placeholder: 'Kupon Kodu'
          },
          third: {
            title: 'Sepet Tutarı',
            first: 'Ana Sepet Tutarı',
            second: 'Ülke',
            third: 'İndirim',
            fourth: 'Son Tutar'
          }
        }
      },
      auth: {
        email: {
          title: 'E-posta',
          bottomMessage: 'Buraya E-posta yazmalısınız'
        },
        password: {
          title: 'Parola',
          bottomMessage: 'Buraya Parola yazmalısınız'
        },
        login: {
          title: 'Giriş Formu',
          subtitle: 'Etkileşim için giriş yapın',
          link: 'Buralarda yeni misiniz?'
        },
        register: {
          title: 'Kayıt Formu',
          subtitle: 'Ürünlerin arasına dalış yapmak için kayıt olun',
          link: 'Zaten yeterince havalı mısınız?',
          username: {
            title: 'Kullanıcı adı',
            bottomMessage: 'Buraya Kullanıcı adı yazmalısınız'
          },
          confirm: {
            title: 'Doğrulama',
            bottomMessage: 'Buraya Doğrulama parolası yazmalısınız'
          }
        }
      },
      toast: {
        inc: {
          title: 'Daha fazla arttıramazsınız',
          desc: "10'a kadar arttırabilsiniz"
        },
        reset: {
          title: 'Sepetinizi sıfırlayamazsınız',
          desc: 'Sepetinizde hiç ürün yok'
        },
        add: {
          title: 'Daha fazla ekleyemezsiniz',
          desc: 'En fazla 10 ürün ekleyebilirsiniz'
        }
      }
    }
  }
})
