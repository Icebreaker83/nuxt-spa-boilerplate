import Vue from 'vue'
import PdfMake from 'pdfmake/build/pdfmake'
import PdfFonts from 'pdfmake/build/vfs_fonts'

Vue.mixin({
  methods: {
    exportRegistration (registration, headerImage) {
      PdfMake.vfs = PdfFonts.pdfMake.vfs

      const header = []
      if (!this.browserIE11()) {
        header.push({
          image: this.getBase64Image(headerImage),
          width: 40,
          height: 65,
          alignment: 'left'
        })
      }
      header.push({ text: '\n\n' + 'Република Србија' + '\n' + 'МИНИСТАРСТВО ФИНАНСИЈА' + '\n' + 'Управа за трезор', fontSize: 10 })
      header.push({ text: '\n\n' + 'Образац ТОП-1' + '\n' + 'Контрола извршења буџета јединица локалних самоуправа', fontSize: 10, alignment: 'right' })

      const docDefinition = {
        content: [
          {
            columns: header
          },
          { text: '\n\n' + this.$t('register.registrationFormTitle') + '\n\n\n', style: 'header' },
          { text: this.$t('register.legalEntityInfo') + '\n\n', style: 'subheader' },
          { text: this.$t('organization.budgetUserId') + ' : ', style: 'caption' },
          { text: registration.budgetUserId + '\n\n', style: 'value' },
          { text: this.$t('organization.name') + ' : ', style: 'caption' },
          { text: registration.name + '\n\n', style: 'value' },
          {
            columns:
            [
              [
                { text: this.$t('organization.companyNumber') + ' : ', style: 'caption' },
                { text: registration.companyNumber + '\n\n', style: 'value' }
              ],
              [
                { text: this.$t('organization.taxIdNumber') + ' : ', style: 'caption' },
                { text: registration.taxIdNumber + '\n\n', style: 'value' }
              ]
            ]
          },
          { text: this.$t('organization.address') + ' : ', style: 'caption' },
          { text: registration.address + '\n\n', style: 'value' },
          {
            columns:
            [
              [
                { text: this.$t('general.email') + ' : ', style: 'caption' },
                { text: registration.email + '\n\n', style: 'value' }
              ],
              [
                { text: this.$t('general.phone') + ' : ', style: 'caption' },
                { text: registration.phoneNumber + '\n\n\n', style: 'value' }
              ]
            ]
          },
          { text: this.$t('register.adminInfo') + '\n\n', style: 'subheader' },
          { text: this.$t('general.nameAndSurname') + ' : ', style: 'caption' },
          { text: registration.adminName + '\n\n', style: 'value' },
          { text: this.$t('general.identityNumber') + ' : ', style: 'caption' },
          { text: registration.adminIdentityNumber + '\n\n', style: 'value' },
          {
            columns:
            [
              [
                { text: this.$t('general.email') + ' : ', style: 'caption' },
                { text: registration.adminEmail + '\n\n', style: 'value' }
              ],
              [
                { text: this.$t('general.phone') + ' : ', style: 'caption' },
                { text: registration.adminPhoneNumber + '\n\n\n', style: 'value' }
              ]
            ]
          },
          { text: this.$t('register.treasuryBranchInfo') + '\n\n', style: 'subheader' },
          { text: this.$t('organization.treasuryBranch') + ' : ', style: 'caption' },
          { text: registration.treasuryBranch + '\n', style: 'value' },
          {
            columns:
            [
              { text: '_____________________________', style: 'caption', alignment: 'right', margin: [0, 35, 15, 5] }
            ]
          },
          {
            columns:
            [
              { text: 'М.П. Потпис одговорног лица' + '\n\n\n', fontSize: 11, alignment: 'right', margin: [0, 0, 15, 0] }
            ]
          },
          {
            columns:
            [
              { text: '*Kада је потписник овлашћења привредни субјекат не постоји обавеза овере печатом', alignment: 'left', style: 'small' }
            ]
          }
        ],
        styles: {
          header: {
            fontSize: 16,
            bold: true,
            alignment: 'center'
          },
          value: {
            fontSize: 11,
            bold: false
          },
          caption: {
            fontSize: 11,
            bold: true
          },
          subheader: {
            fontSize: 13,
            bold: true
          },
          quote: {
            italics: true
          },
          small: {
            fontSize: 9
          }
        }
      }
      PdfMake.createPdf(docDefinition).download('nalog.pdf')
    },
    getBase64Image (img) {
      if (this.browserIE11()) { return }

      // Create an empty canvas element
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height

      // Copy the image contents to the canvas
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)

      return canvas.toDataURL('image/png')
    }
  }
})
