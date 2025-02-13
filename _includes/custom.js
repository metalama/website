<script>
	$(window).on('load',function() {
	  var navSelector = "#toc";
	  var $myNav = $(navSelector);
	  Toc.init({
		$nav: $myNav,
		$scope: $('.post_body h2')
	  });
	  $("body").scrollspy({
		target: navSelector
	  });
	});
	
	$(document).ready(function () {
		$("#toc ul").eq(0).remove();
	});
</script>

