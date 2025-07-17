let cropper;
let croppedImageDataURL;

$(document).ready(function () {
  // ✅ Check if form already submitted
  if (localStorage.getItem('formSubmitted') === 'true') {
    $('#consumerForm :input').prop('disabled', true);
    $('#submitbutton').hide();
    $('#shareBtn').hide();
    $('#thankYouMessage').show();
    return; // stop further code
  }

  $('#image').change(function (event) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        $('#imageToCrop').attr('src', e.target.result);
        $('#cropperModal').modal('show');
      };
      reader.readAsDataURL(file);
    }
  });

  let whatsappClickCount = 0;
  const maxClickCount = 5;

  $('#shareBtn').click(function () {
    if (whatsappClickCount >= maxClickCount) {
      toastr.info("Sharing complete. Please continue.");
      return;
    }

    const msg = "Hey Buddy, Join Tech For Girls Community!";
    const url = "https://wa.me/?text=" + encodeURIComponent(msg);
    window.open(url, "_blank");

    whatsappClickCount++;
    $('#counter').text("Click count: " + whatsappClickCount + "/5");

    if (whatsappClickCount === maxClickCount) {
      $('#shareBtn').prop('disabled', true);
      $('#counter').text("Click count: " + whatsappClickCount + "/5 🎯 Sharing complete. Please continue.");
    }
  });

  $('#cropperModal').on('shown.bs.modal', function () {
    const image = document.getElementById('imageToCrop');
    cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1
    });
  }).on('hidden.bs.modal', function () {
    cropper.destroy();
    cropper = null;
  });

  $('#cropAndSaveButton').click(function () {
    const canvas = cropper.getCroppedCanvas({
      width: 300,
      height: 300
    });
    croppedImageDataURL = canvas.toDataURL('image/jpeg');
    $('#imagePreview').html('<img src="' + croppedImageDataURL + '" />');
    $('#cropperModal').modal('hide');
  });

  $('#consumerForm').submit(function (event) {
    event.preventDefault();
    const btn = document.getElementById('submitbutton');
    btn.innerHTML = 'Please wait...';
    btn.disabled = true;

    if (croppedImageDataURL) {
      const name = $('#name').val();
      const mobileno = $('#mobileno').val();
      const currentDate = new Date().toISOString().split('T')[0];
      const fileName = name + "_" + mobileno + "_" + currentDate + ".jpg";
      const base64Data = croppedImageDataURL.split(',')[1];

      google.script.run.withSuccessHandler(function (imageUrl) {
        const data = {
          name: $('#name').val(),
          mobileno: mobileno,
          email: $('#email').val(),
          college: $('#college').val(),
          gender: $('#gender').val(),
          imageUrl: imageUrl
        };

        google.script.run.withSuccessHandler(function () {
          toastr.success("Form submitted successfully!");
          $('#consumerForm :input').prop('disabled', true);
          $('#submitbutton').hide();
          $('#shareBtn').hide();
          $('#thankYouMessage').show();

          // ✅ Save flag to localStorage
          localStorage.setItem('formSubmitted', 'true');
        }).submitForm(data);
      }).uploadFile(base64Data, fileName);
    } else {
      toastr.error("Please upload and crop an image.");
      btn.innerHTML = 'Submit';
      btn.disabled = false;
    }
  });
});
