// mock/mockProdServer.ts
import { createProdMockServer } from "vite-plugin-mock/client";

// mock/user.ts
import Mock2 from "mockjs";

// mock/_util.ts
import Mock from "mockjs";
function resultSuccess(data, { message = "\u64CD\u4F5C\u6210\u529F!" } = {}) {
  return Mock.mock({
    status: 0,
    data,
    message
  });
}

// mock/user.ts
var token = Mock2.Random.string("upper", 32, 32);
var user_default = [
  {
    url: "/api/login",
    timeout: 1e3,
    method: "post",
    response: () => {
      return resultSuccess({ token });
    }
  }
];

// mock/mockProdServer.ts
function setupProdMockServer() {
  createProdMockServer([...user_default]);
}
export {
  setupProdMockServer
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibW9jay9tb2NrUHJvZFNlcnZlci50cyIsICJtb2NrL3VzZXIudHMiLCAibW9jay9fdXRpbC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX19pbmplY3RlZF9maWxlbmFtZV9fID0gXCIvVXNlcnMvemhlbmdnbC9EZXNrdG9wL015X0Jsb2cvXHU2MjExXHU3Njg0XHU5ODc5XHU3NkVFL25hdGlvbmFsLWtiLWFkbWluL21vY2svbW9ja1Byb2RTZXJ2ZXIudHNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL1VzZXJzL3poZW5nZ2wvRGVza3RvcC9NeV9CbG9nL1x1NjIxMVx1NzY4NFx1OTg3OVx1NzZFRS9uYXRpb25hbC1rYi1hZG1pbi9tb2NrXCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9Vc2Vycy96aGVuZ2dsL0Rlc2t0b3AvTXlfQmxvZy8lRTYlODglOTElRTclOUElODQlRTklQTElQjklRTclOUIlQUUvbmF0aW9uYWwta2ItYWRtaW4vbW9jay9tb2NrUHJvZFNlcnZlci50c1wiO2ltcG9ydCB7IGNyZWF0ZVByb2RNb2NrU2VydmVyIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jay9jbGllbnQnXG5cbi8vIFx1OTAxMFx1NEUwMFx1NUJGQ1x1NTE2NVx1NjBBOFx1NzY4NG1vY2sudHNcdTY1ODdcdTRFRjZcbi8vIFx1NTk4Mlx1Njc5Q1x1NEY3Rlx1NzUyOHZpdGUubW9jay5jb25maWcudHNcdUZGMENcdTUzRUFcdTk3MDBcdTc2RjRcdTYzQTVcdTVCRkNcdTUxNjVcdTY1ODdcdTRFRjZcbi8vIFx1NTNFRlx1NEVFNVx1NEY3Rlx1NzUyOCBpbXBvcnQubWV0YS5nbG9iXHU1MjlGXHU4MEZEXHU2NzY1XHU4RkRCXHU4ODRDXHU1MTY4XHU5MEU4XHU1QkZDXHU1MTY1XG5pbXBvcnQgdXNlciBmcm9tICcuL3VzZXInXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFByb2RNb2NrU2VydmVyKCkge1xuICBjcmVhdGVQcm9kTW9ja1NlcnZlcihbLi4udXNlcl0pXG59XG4iLCAiY29uc3QgX19pbmplY3RlZF9maWxlbmFtZV9fID0gXCIvVXNlcnMvemhlbmdnbC9EZXNrdG9wL015X0Jsb2cvXHU2MjExXHU3Njg0XHU5ODc5XHU3NkVFL25hdGlvbmFsLWtiLWFkbWluL21vY2svdXNlci50c1wiO2NvbnN0IF9faW5qZWN0ZWRfZGlybmFtZV9fID0gXCIvVXNlcnMvemhlbmdnbC9EZXNrdG9wL015X0Jsb2cvXHU2MjExXHU3Njg0XHU5ODc5XHU3NkVFL25hdGlvbmFsLWtiLWFkbWluL21vY2tcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL1VzZXJzL3poZW5nZ2wvRGVza3RvcC9NeV9CbG9nLyVFNiU4OCU5MSVFNyU5QSU4NCVFOSVBMSVCOSVFNyU5QiVBRS9uYXRpb25hbC1rYi1hZG1pbi9tb2NrL3VzZXIudHNcIjtpbXBvcnQgTW9jayBmcm9tICdtb2NranMnXG5pbXBvcnQgeyByZXN1bHRTdWNjZXNzIH0gZnJvbSAnLi9fdXRpbCdcbmltcG9ydCB7IE1vY2tNZXRob2QgfSBmcm9tICd2aXRlLXBsdWdpbi1tb2NrJ1xuXG5jb25zdCB0b2tlbiA9IE1vY2suUmFuZG9tLnN0cmluZygndXBwZXInLCAzMiwgMzIpXG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAge1xuICAgIHVybDogJy9hcGkvbG9naW4nLFxuICAgIHRpbWVvdXQ6IDEwMDAsXG4gICAgbWV0aG9kOiAncG9zdCcsXG4gICAgcmVzcG9uc2U6ICgpID0+IHtcbiAgICAgIHJldHVybiByZXN1bHRTdWNjZXNzKHsgdG9rZW4gfSk7XG4gICAgfSxcbiAgfSxcbl0gYXMgTW9ja01ldGhvZFtdXG4iLCAiY29uc3QgX19pbmplY3RlZF9maWxlbmFtZV9fID0gXCIvVXNlcnMvemhlbmdnbC9EZXNrdG9wL015X0Jsb2cvXHU2MjExXHU3Njg0XHU5ODc5XHU3NkVFL25hdGlvbmFsLWtiLWFkbWluL21vY2svX3V0aWwudHNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL1VzZXJzL3poZW5nZ2wvRGVza3RvcC9NeV9CbG9nL1x1NjIxMVx1NzY4NFx1OTg3OVx1NzZFRS9uYXRpb25hbC1rYi1hZG1pbi9tb2NrXCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9Vc2Vycy96aGVuZ2dsL0Rlc2t0b3AvTXlfQmxvZy8lRTYlODglOTElRTclOUElODQlRTklQTElQjklRTclOUIlQUUvbmF0aW9uYWwta2ItYWRtaW4vbW9jay9fdXRpbC50c1wiO2ltcG9ydCBNb2NrIGZyb20gJ21vY2tqcydcblxuZXhwb3J0IGZ1bmN0aW9uIHJlc3VsdFN1Y2Nlc3MoZGF0YTogYW55LCB7IG1lc3NhZ2UgPSAnXHU2NENEXHU0RjVDXHU2MjEwXHU1MjlGIScgfSA9IHt9KSB7XG4gIHJldHVybiBNb2NrLm1vY2soe1xuICAgIHN0YXR1czogMCxcbiAgICBkYXRhLFxuICAgIG1lc3NhZ2UsXG4gIH0pXG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtXLFNBQVMsNEJBQTRCOzs7QUNBekQsT0FBT0EsV0FBVTs7O0FDQWYsT0FBTyxVQUFVO0FBRTFWLFNBQVMsY0FBYyxNQUFXLEVBQUUsVUFBVSw0QkFBUSxJQUFJLENBQUMsR0FBRztBQUNuRSxTQUFPLEtBQUssS0FBSztBQUFBLElBQ2YsUUFBUTtBQUFBLElBQ1I7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBQ0g7OztBREpBLElBQU0sUUFBUUMsTUFBSyxPQUFPLE9BQU8sU0FBUyxJQUFJLEVBQUU7QUFFaEQsSUFBTyxlQUFRO0FBQUEsRUFDYjtBQUFBLElBQ0UsS0FBSztBQUFBLElBQ0wsU0FBUztBQUFBLElBQ1QsUUFBUTtBQUFBLElBQ1IsVUFBVSxNQUFNO0FBQ2QsYUFBTyxjQUFjLEVBQUUsTUFBTSxDQUFDO0FBQUEsSUFDaEM7QUFBQSxFQUNGO0FBQ0Y7OztBRFJPLFNBQVMsc0JBQXNCO0FBQ3BDLHVCQUFxQixDQUFDLEdBQUcsWUFBSSxDQUFDO0FBQ2hDOyIsCiAgIm5hbWVzIjogWyJNb2NrIiwgIk1vY2siXQp9Cg==